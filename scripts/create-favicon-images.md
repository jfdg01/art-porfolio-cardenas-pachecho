# Favicon Image Creation Guide

Since the automated script couldn't find ImageMagick or FFmpeg, you'll need to manually create the favicon images. Here are several options:

## Option 1: Online Favicon Generator (Recommended)

1. Go to https://realfavicongenerator.net/
2. Upload your `favicon.ico` file
3. Download the generated favicon package
4. Extract the files to your `static` directory

## Option 2: Using GIMP (Free)

1. Open GIMP
2. Open your `favicon.ico` file
3. Create new images with these sizes:
   - 16x16 pixels → save as `favicon-16x16.png`
   - 32x32 pixels → save as `favicon-32x32.png`
   - 180x180 pixels → save as `apple-touch-icon.png`
   - 192x192 pixels → save as `android-chrome-192x192.png`
   - 512x512 pixels → save as `android-chrome-512x512.png`

## Option 3: Install ImageMagick (Windows)

1. Download from https://imagemagick.org/script/download.php#windows
2. Install ImageMagick
3. Run: `node scripts/generate-favicons.mjs`

## Option 4: Install FFmpeg (Windows)

1. Download from https://ffmpeg.org/download.html
2. Add FFmpeg to your PATH
3. Run: `node scripts/generate-favicons.mjs`

## Current Setup

Your favicon is currently set up to work with just the `favicon.ico` file, which will display in browser tabs. For better mobile and search engine support, create the additional PNG files listed above.

## Files to Create

- `static/favicon-16x16.png` (16x16 pixels)
- `static/favicon-32x32.png` (32x32 pixels)
- `static/apple-touch-icon.png` (180x180 pixels)
- `static/android-chrome-192x192.png` (192x192 pixels)
- `static/android-chrome-512x512.png` (512x512 pixels)

Once you create these files, update `src/app.html` to include the proper favicon links.
