import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Check if ImageMagick is available
function checkImageMagick() {
	try {
		execSync('magick -version', { stdio: 'ignore' });
		return true;
	} catch {
		return false;
	}
}

// Check if ffmpeg is available (alternative)
function checkFFmpeg() {
	try {
		execSync('ffmpeg -version', { stdio: 'ignore' });
		return true;
	} catch {
		return false;
	}
}

async function generateFavicons() {
	const staticDir = path.join(process.cwd(), 'static');
	const faviconPath = path.join(staticDir, 'favicon.ico');

	if (!fs.existsSync(faviconPath)) {
		console.error('favicon.ico not found in static directory');
		process.exit(1);
	}

	console.log('Generating favicon variants...');

	if (checkImageMagick()) {
		console.log('Using ImageMagick...');

		// Generate different sizes
		const sizes = [
			{ size: 16, name: 'favicon-16x16.png' },
			{ size: 32, name: 'favicon-32x32.png' },
			{ size: 192, name: 'android-chrome-192x192.png' },
			{ size: 512, name: 'android-chrome-512x512.png' },
			{ size: 180, name: 'apple-touch-icon.png' }
		];

		for (const { size, name } of sizes) {
			try {
				execSync(`magick "${faviconPath}" -resize ${size}x${size} "${path.join(staticDir, name)}"`);
				console.log(`✓ Generated ${name}`);
			} catch (error) {
				console.error(`✗ Failed to generate ${name}:`, error.message);
			}
		}
	} else if (checkFFmpeg()) {
		console.log('Using FFmpeg...');

		// Generate different sizes with ffmpeg
		const sizes = [
			{ size: 16, name: 'favicon-16x16.png' },
			{ size: 32, name: 'favicon-32x32.png' },
			{ size: 192, name: 'android-chrome-192x192.png' },
			{ size: 512, name: 'android-chrome-512x512.png' },
			{ size: 180, name: 'apple-touch-icon.png' }
		];

		for (const { size, name } of sizes) {
			try {
				execSync(
					`ffmpeg -i "${faviconPath}" -vf scale=${size}:${size} "${path.join(staticDir, name)}" -y`
				);
				console.log(`✓ Generated ${name}`);
			} catch (error) {
				console.error(`✗ Failed to generate ${name}:`, error.message);
			}
		}
	} else {
		console.log('Neither ImageMagick nor FFmpeg found. Creating placeholder files...');

		// Create placeholder files with instructions
		const sizes = [
			'favicon-16x16.png',
			'favicon-32x32.png',
			'android-chrome-192x192.png',
			'android-chrome-512x512.png',
			'apple-touch-icon.png'
		];

		for (const name of sizes) {
			const placeholderPath = path.join(staticDir, name);
			fs.writeFileSync(placeholderPath, '');
			console.log(`✓ Created placeholder ${name}`);
		}

		console.log('\nNote: Please manually create favicon images in the following sizes:');
		console.log('- favicon-16x16.png (16x16 pixels)');
		console.log('- favicon-32x32.png (32x32 pixels)');
		console.log('- android-chrome-192x192.png (192x192 pixels)');
		console.log('- android-chrome-512x512.png (512x512 pixels)');
		console.log('- apple-touch-icon.png (180x180 pixels)');
	}

	// Create web app manifest
	const manifest = {
		name: 'Portal Artistas',
		short_name: 'Portal Artistas',
		icons: [
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png'
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png'
			}
		],
		theme_color: '#ffffff',
		background_color: '#ffffff',
		display: 'standalone'
	};

	fs.writeFileSync(path.join(staticDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

	console.log('✓ Generated site.webmanifest');
	console.log('\nFavicon generation complete!');
}

generateFavicons().catch(console.error);
