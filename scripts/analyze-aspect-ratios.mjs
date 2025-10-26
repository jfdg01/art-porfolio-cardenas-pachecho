#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Script to analyze image aspect ratios and find the image with the biggest aspect ratio difference
 */

const IMAGES_DIR = path.join(process.cwd(), 'src', 'lib', 'assets', 'images');

async function getImageDimensions(filePath) {
	try {
		const metadata = await sharp(filePath).metadata();
		return {
			width: metadata.width,
			height: metadata.height
		};
	} catch (error) {
		console.error(`Error reading ${filePath}:`, error.message);
		return null;
	}
}

function calculateAspectRatio(width, height) {
	return width / height;
}

function getAspectRatioDistance(width, height) {
	// Calculate how far the aspect ratio is from 1:1
	const aspectRatio = calculateAspectRatio(width, height);
	// Return the absolute difference from 1
	return Math.abs(aspectRatio - 1);
}

async function analyzeAspectRatios() {
	console.log('🔍 Analyzing image aspect ratios...\n');

	if (!fs.existsSync(IMAGES_DIR)) {
		console.error(`❌ Images directory not found: ${IMAGES_DIR}`);
		process.exit(1);
	}

	const files = fs.readdirSync(IMAGES_DIR).filter((file) => {
		const ext = path.extname(file).toLowerCase();
		return ext === '.webp' && !file.startsWith('.');
	});

	if (files.length === 0) {
		console.log('ℹ️  No images found in the directory');
		return;
	}

	console.log(`📊 Found ${files.length} images to analyze\n`);

	const results = [];

	for (const file of files) {
		const filePath = path.join(IMAGES_DIR, file);
		const dimensions = await getImageDimensions(filePath);

		if (dimensions) {
			const aspectRatio = calculateAspectRatio(dimensions.width, dimensions.height);
			const distance = getAspectRatioDistance(dimensions.width, dimensions.height);

			results.push({
				file,
				width: dimensions.width,
				height: dimensions.height,
				aspectRatio,
				distance,
				orientation: dimensions.width > dimensions.height ? 'landscape' : 'portrait'
			});
		}
	}

	// Sort by distance from 1:1 (biggest first)
	results.sort((a, b) => b.distance - a.distance);

	// Display results
	console.log('📐 Aspect Ratio Analysis Results:\n');

	// Show all images sorted by aspect ratio difference
	results.forEach((result, index) => {
		const ratioStr = result.aspectRatio.toFixed(3);
		const orientation = result.width > result.height ? 'landscape' : 'portrait';
		const marker = index === 0 ? '⭐' : '  ';
		console.log(
			`${marker} ${result.file.padEnd(40)} ${result.width}×${result.height} (ratio: ${ratioStr}, ${orientation})`
		);
	});

	// Highlight the most extreme
	if (results.length > 0) {
		const mostExtreme = results[0];
		console.log('\n' + '='.repeat(80));
		console.log('🏆 BIGGEST ASPECT RATIO (Most dissimilar width to height):');
		console.log('='.repeat(80));
		console.log(`   📁 File: ${mostExtreme.file}`);
		console.log(`   📏 Dimensions: ${mostExtreme.width} × ${mostExtreme.height} px`);
		console.log(`   📐 Aspect Ratio: ${mostExtreme.aspectRatio.toFixed(3)}:1`);
		console.log(`   📊 Distance from 1:1: ${mostExtreme.distance.toFixed(3)}`);
		console.log(`   🖼️  Orientation: ${mostExtreme.orientation}`);
		console.log('='.repeat(80) + '\n');
	}

	return results;
}

// Run the analysis
analyzeAspectRatios().catch((error) => {
	console.error('❌ Analysis failed:', error.message);
	process.exit(1);
});
