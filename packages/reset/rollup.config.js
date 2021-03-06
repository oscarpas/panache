import pkg from './package.json'
import typescript from 'rollup-plugin-typescript'

export default [
	{
		input: 'src/main.ts',
		plugins: [
			typescript({ tsconfig: './tsconfig.json' }),
		],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
]