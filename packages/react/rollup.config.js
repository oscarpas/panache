import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const isDev = process.env.BUILD === 'dev'

const plugins = isDev
	? [
		typescript({ tsconfig: './tsconfig.json' }),
		nodeResolve(),
	] : [
		typescript({ tsconfig: './tsconfig.json' }),
		nodeResolve(),
		terser({
			output: {
				comments: false
			}
		}),
	]

export default [
	{
		input: 'src/main.ts',
		external: ['react'],
		plugins,
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
]