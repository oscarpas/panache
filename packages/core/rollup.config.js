import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
	{
		input: 'src/main.ts',
		plugins: [
			typescript({
				strict: true,
				forceConsistentCasingInFileNames: true,
				noImplicitReturns: true,
				noUnusedLocals: true
			}),
			nodeResolve(),
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