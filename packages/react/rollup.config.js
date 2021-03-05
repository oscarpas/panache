import pkg from './package.json'
import typescript from 'rollup-plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'

export default [
	{
		input: 'src/main.ts',
		external: ['react'],
		plugins: [
			typescript({
				strict: true,
				forceConsistentCasingInFileNames: true,
				noImplicitReturns: true,
				noUnusedLocals: true
			}),
			resolve({
				only: ['@panache/core']
			}),
		],
		output: [
			{ file: pkg.module, format: 'es' }
		]
	}
]