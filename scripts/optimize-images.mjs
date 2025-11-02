import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Configuration
const INPUT_IMAGES_DIR = path.join(process.cwd(), 'src', 'lib', 'assets', 'imagesRaw');
const OUTPUT_IMAGES_DIR = path.join(process.cwd(), 'src', 'lib', 'assets', 'images');
const MAX_DIMENSION = 4096;
const WEBP_QUALITY = 85;

async function optimizeImages() {
	console.log('Starting image optimization...\n');
	console.log(`Input directory: ${INPUT_IMAGES_DIR}`);
	console.log(`Output directory: ${OUTPUT_IMAGES_DIR}`);
	console.log(`Max dimension: ${MAX_DIMENSION}px`);
	console.log(`WebP quality: ${WEBP_QUALITY}\n`);

	// Create output directory if it doesn't exist
	if (!fs.existsSync(OUTPUT_IMAGES_DIR)) {
		fs.mkdirSync(OUTPUT_IMAGES_DIR, { recursive: true });
		console.log(`Created output directory: ${OUTPUT_IMAGES_DIR}\n`);
	}

	// Read all files from input directory
	let files;
	try {
		files = fs.readdirSync(INPUT_IMAGES_DIR);
	} catch (error) {
		console.error(`Error reading input directory: ${error.message}`);
		process.exit(1);
	}

	if (files.length === 0) {
		console.log('No files found in input directory.');
		return;
	}

	console.log(`Found ${files.length} files to process\n`);

	let processed = 0;
	let skipped = 0;
	let errors = 0;

	// Process each file
	for (const file of files) {
		const inputPath = path.join(INPUT_IMAGES_DIR, file);
		const nameWithoutExt = path.parse(file).name;
		const outputPath = path.join(OUTPUT_IMAGES_DIR, `${nameWithoutExt}.webp`);

		// Skip directories
		if (fs.statSync(inputPath).isDirectory()) {
			skipped++;
			continue;
		}

		try {
			// Get image metadata
			const metadata = await sharp(inputPath).metadata();

			// Process and optimize image
			await sharp(inputPath)
				.resize(MAX_DIMENSION, MAX_DIMENSION, {
					fit: 'inside',
					withoutEnlargement: true
				})
				.webp({ quality: WEBP_QUALITY })
				.toFile(outputPath);

			// Calculate size reduction
			const inputSize = fs.statSync(inputPath).size;
			const outputSize = fs.statSync(outputPath).size;
			const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);
			const inputSizeMB = (inputSize / 1024 / 1024).toFixed(2);
			const outputSizeMB = (outputSize / 1024 / 1024).toFixed(2);

			console.log(`[OK] ${file}`);
			console.log(
				`  ${metadata.width}x${metadata.height} -> ${inputSizeMB}MB -> ${outputSizeMB}MB (${reduction}% reduction)`
			);

			processed++;
		} catch (error) {
			console.error(`[ERROR] Error processing ${file}: ${error.message}`);
			errors++;
		}
	}

	// Print summary
	console.log('\n' + '='.repeat(50));
	console.log('Summary:');
	console.log(`  Processed: ${processed}`);
	if (skipped > 0) console.log(`  Skipped: ${skipped}`);
	if (errors > 0) console.log(`  Errors: ${errors}`);
	console.log('='.repeat(50));
	console.log('\nImage optimization complete!');
}

// Run the optimization
optimizeImages().catch((error) => {
	console.error('Fatal error:', error);
	process.exit(1);
});
