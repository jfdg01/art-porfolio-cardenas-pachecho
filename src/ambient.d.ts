// Squelch warnings of image imports from your assets dir
declare module '$lib/assets/*' {
	const meta: {
		src: string;
		width: number;
		height: number;
		format: string;
	};
	export default meta;
}
