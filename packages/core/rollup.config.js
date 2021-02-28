import pkg from './package.json'
import typescript from 'rollup-plugin-typescript'

export default [
	{
		input: 'src/main.ts',
		plugins: [
			typescript()
		],
		output: [
			{ file: pkg.module, format: 'es' }
		]
	}
]