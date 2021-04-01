import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'

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
		copy({
			targets: [
				{ src: 'src/main.d.ts', dest: 'dist' },
				{ src: 'src/types/**/*', dest: 'dist/types' },
			]
		})
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