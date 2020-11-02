import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript'
import jsx from 'acorn-jsx'

const sharedConfig = {
	input: 'src/main.ts',
	external: ['react'],
}

export default [
	// browser-friendly UMD build
	{
		...sharedConfig,
		output: {
			name: 'panache',
			file: pkg.browser,
			format: 'umd'
		},
		acornInjectPlugins: [jsx()],
		plugins: [
			resolve(), // so Rollup can find `ms`
			typescript(),
			commonjs(), // so Rollup can convert `ms` to an ES module
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		...sharedConfig,
		acornInjectPlugins: [jsx()],
		plugins: [
			typescript()
		],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];
