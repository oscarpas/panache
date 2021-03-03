import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default [
	{
		input: 'src/main.ts',
		plugins: [
			typescript(),
			terser({
				output: {
					comments: false
				}
			}),
		],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
]