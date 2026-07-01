#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Script to convert images to WebP format with 95% quality and 4K max resolution
 * This script processes all images in the source directory and converts them to WebP
 */

const OUTPUT_IMAGES_DIR = path.join(process.cwd(), 'src', 'lib', 'assets', 'images');
const MAX_DIMENSION = 1536;
const WEBP_QUALITY = 70;

// Supported input image extensions
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

/**
 * Normalizes a filename by:
 * - Removing accents and diacritics
 * - Converting to lowercase
 * - Replacing spaces with hyphens
 * - Removing any other special characters except dots and hyphens
 */
function normalizeFileName(fileName) {
	// Remove file extension temporarily
	const ext = path.extname(fileName);
	const baseName = path.basename(fileName, ext);

	// Normalize the base name
	let normalized = baseName
		// Remove accents and diacritics
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		// Convert to lowercase
		.toLowerCase()
		// Replace spaces and underscores with hyphens
		.replace(/[\s_]+/g, '-')
		// Remove any characters that aren't letters, numbers, or hyphens
		.replace(/[^a-z0-9-]/g, '')
		// Remove multiple consecutive hyphens
		.replace(/-+/g, '-')
		// Remove leading/trailing hyphens
		.replace(/^-+|-+$/g, '');

	// Ensure we don't have an empty name
	if (!normalized) {
		normalized = 'unnamed';
	}

	return normalized + ext;
}

function getImageFiles(sourceDir) {
	if (!fs.existsSync(sourceDir)) {
		console.error(`❌ Source images directory not found: ${sourceDir}`);
		process.exit(1);
	}

	const files = fs.readdirSync(sourceDir).filter((file) => {
		const ext = path.extname(file).toLowerCase();
		return SUPPORTED_EXTENSIONS.has(ext) && !file.startsWith('.');
	});

	return files;
}

function getWebPFileName(originalFileName) {
	const normalizedName = normalizeFileName(originalFileName);
	const baseName = path.basename(normalizedName, path.extname(normalizedName));
	return `${baseName}.webp`;
}

async function processImage(fileName, sourceDir) {
	const inputPath = path.join(sourceDir, fileName);
	const normalizedFileName = normalizeFileName(fileName);
	const webpFileName = getWebPFileName(fileName);
	const outputPath = path.join(OUTPUT_IMAGES_DIR, webpFileName);

	// Ensure output directory exists
	if (!fs.existsSync(OUTPUT_IMAGES_DIR)) {
		fs.mkdirSync(OUTPUT_IMAGES_DIR, { recursive: true });
		console.log(`📁 Created output directory: ${OUTPUT_IMAGES_DIR}`);
	}

	// Always overwrite existing files in src/lib/assets/images directory
	if (fs.existsSync(outputPath)) {
		console.log(`\n🔄 Overwriting existing WebP file: ${webpFileName}`);
	}

	try {
		// Get image metadata
		const metadata = await sharp(inputPath).metadata();
		console.log(`\n🖼️  Processing: ${fileName}`);
		if (fileName !== normalizedFileName) {
			console.log(`   Normalized: ${normalizedFileName}`);
		}
		console.log(`   Original: ${metadata.width}x${metadata.height} (${metadata.format})`);

		// Calculate new dimensions if needed
		let newWidth = metadata.width;
		let newHeight = metadata.height;

		if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
			const aspectRatio = metadata.width / metadata.height;
			if (metadata.width > metadata.height) {
				newWidth = MAX_DIMENSION;
				newHeight = Math.round(MAX_DIMENSION / aspectRatio);
			} else {
				newHeight = MAX_DIMENSION;
				newWidth = Math.round(MAX_DIMENSION * aspectRatio);
			}
			console.log(`   Resizing to: ${newWidth}x${newHeight} (4K max)`);
		}

		// Handle WebP-to-WebP conversion with temporary file
		let tempPath = null;
		let finalOutputPath = outputPath;

		if (path.extname(fileName).toLowerCase() === '.webp') {
			// Create temporary file for WebP-to-WebP conversion
			tempPath = path.join(OUTPUT_IMAGES_DIR, `temp_${webpFileName}`);
			finalOutputPath = tempPath;
		}

		// Convert to WebP
		await sharp(inputPath)
			.resize(newWidth, newHeight, {
				fit: 'inside',
				withoutEnlargement: true
			})
			.webp({ quality: WEBP_QUALITY })
			.toFile(finalOutputPath);

		// If we used a temp file, replace the original
		if (tempPath) {
			fs.renameSync(tempPath, outputPath);
		}

		// Get output file size
		const outputStats = fs.statSync(outputPath);
		const inputStats = fs.statSync(inputPath);
		const compressionRatio = (
			((inputStats.size - outputStats.size) / inputStats.size) *
			100
		).toFixed(1);

		console.log(`   ✅ Converted to: ${webpFileName}`);
		console.log(
			`   📊 Size: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB (${compressionRatio}% smaller)`
		);

		// Note: Original file is NOT removed since it's in the source directory
		console.log(`   📁 Saved to: ${outputPath}`);

		return {
			original: fileName,
			webp: webpFileName,
			originalSize: inputStats.size,
			webpSize: outputStats.size,
			compressionRatio: parseFloat(compressionRatio),
			dimensions: { width: newWidth, height: newHeight }
		};
	} catch (error) {
		console.error(`❌ Error processing ${fileName}:`, error.message);
		return null;
	}
}

async function convertImages(sourceDir) {
	console.log('🚀 Starting image conversion to WebP...');
	console.log(`📁 Source directory: ${sourceDir}`);
	console.log(`📁 Output directory: ${OUTPUT_IMAGES_DIR}`);
	console.log(`🎯 Target quality: ${WEBP_QUALITY}%`);
	console.log(`📏 Max resolution: ${MAX_DIMENSION}x${MAX_DIMENSION}`);
	console.log(`🔄 Will overwrite existing WebP files in output directory`);

	// Get all image files
	const imageFiles = getImageFiles(sourceDir);

	if (imageFiles.length === 0) {
		console.log('ℹ️  No images found to convert');
		return;
	}

	console.log(`\n📊 Found ${imageFiles.length} images to convert:`);
	imageFiles.forEach((file) => console.log(`   - ${file}`));

	const results = [];
	let successCount = 0;
	let skippedCount = 0;
	let totalOriginalSize = 0;
	let totalWebpSize = 0;

	console.log('\n🔄 Starting conversion process...');

	for (const fileName of imageFiles) {
		const result = await processImage(fileName, sourceDir);
		if (result) {
			results.push(result);
			successCount++;
			totalOriginalSize += result.originalSize;
			totalWebpSize += result.webpSize;
		} else {
			skippedCount++;
		}
	}

	// Summary
	console.log('\n📊 Conversion Summary:');
	console.log(`   ✅ Successfully converted: ${successCount}/${imageFiles.length} images`);
	console.log(`   ⏭️  Skipped (errors): ${skippedCount}/${imageFiles.length} images`);
	console.log(`   📁 Original total size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
	console.log(`   📁 WebP total size: ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
	console.log(
		`   💾 Space saved: ${((totalOriginalSize - totalWebpSize) / 1024 / 1024).toFixed(2)} MB`
	);
	console.log(
		`   📈 Average compression: ${(((totalOriginalSize - totalWebpSize) / totalOriginalSize) * 100).toFixed(1)}%`
	);

	if (results.length > 0) {
		console.log('\n📋 Conversion Details:');
		results.forEach((result) => {
			console.log(
				`   ${result.original} → ${result.webp} (${result.dimensions.width}x${result.dimensions.height}, ${result.compressionRatio}% smaller)`
			);
		});
	}

	console.log('\n✅ Image conversion completed!');
	console.log('💡 You can now update your artwork data to reference .webp files');
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
	console.log(`
WebP Conversion Script

Usage: node scripts/convert-to-webp.mjs <source-directory> [options]

Arguments:
  source-directory    Path to the directory containing images to convert

Options:
  --help, -h          Show this help message
  --dry-run           Show what would be converted without actually converting

This script will:
- Convert all .jpg, .jpeg, .png, and .webp files to .webp format
- Normalize filenames by removing accents, diacritics, converting to lowercase, and replacing spaces with hyphens
- Use 70% quality for WebP compression
- Resize images to maximum 1536x1536 resolution while maintaining aspect ratio
- Save converted files to src/lib/assets/images directory
- Always overwrite existing files in the output directory
- Preserve original files in the source directory
- Show detailed conversion statistics

Examples:
  node scripts/convert-to-webp.mjs ./my-images
  node scripts/convert-to-webp.mjs "C:\\Users\\User\\Pictures" --dry-run
  node scripts/convert-to-webp.mjs /path/to/images
`);
	process.exit(0);
}

// Get source directory from command line arguments
const sourceDirArg = args.find((arg) => !arg.startsWith('--'));
if (!sourceDirArg) {
	console.error('❌ Error: Source directory is required');
	console.log('Usage: node scripts/convert-to-webp.mjs <source-directory> [options]');
	console.log('Use --help for more information');
	process.exit(1);
}

// Resolve the source directory path
const sourceDir = path.resolve(sourceDirArg);

if (args.includes('--dry-run')) {
	console.log('🔍 Dry run mode - showing what would be converted:');
	console.log(`📁 Source directory: ${sourceDir}`);
	console.log(`📁 Output directory: ${OUTPUT_IMAGES_DIR}`);

	const imageFiles = getImageFiles(sourceDir);
	console.log(`Found ${imageFiles.length} images to process:`);

	let wouldConvert = 0;

	imageFiles.forEach((file) => {
		const normalizedFileName = normalizeFileName(file);
		const webpFileName = getWebPFileName(file);

		if (file !== normalizedFileName) {
			console.log(`   ✅ ${file} → ${normalizedFileName} → ${webpFileName} (CONVERT)`);
		} else {
			console.log(`   ✅ ${file} → ${webpFileName} (CONVERT)`);
		}
		wouldConvert++;
	});

	console.log(`\n📊 Dry run summary:`);
	console.log(`   ✅ Would convert: ${wouldConvert} images`);
	console.log(`   📁 Output directory: ${OUTPUT_IMAGES_DIR}`);
	process.exit(0);
}

// Run the conversion
convertImages(sourceDir).catch((error) => {
	console.error('❌ Conversion failed:', error.message);
	process.exit(1);
});
