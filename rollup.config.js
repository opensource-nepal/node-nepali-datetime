const typescript = require('@rollup/plugin-typescript')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')

module.exports = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: 'dist/index.mjs',
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [typescript(), commonjs(), resolve()],
    },
    {
        input: 'src/dateConverter/index.ts',
        output: [
            {
                file: 'dist/dateConverter.js',
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: 'dist/dateConverter.mjs',
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [typescript(), commonjs(), resolve()],
    },
]
