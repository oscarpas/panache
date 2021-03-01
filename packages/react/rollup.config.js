import pkg from './package.json'
import typescript from 'rollup-plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'

export default [
	{
		input: 'src/main.ts',
		external: ['react'],
		plugins: [
			typescript(),
			resolve({
				only: [ '@panache/core',]
			}),
		],
		output: [
			{ file: pkg.module, format: 'es' }
		]
	}
]