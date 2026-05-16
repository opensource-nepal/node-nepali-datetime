import { defineConfig } from 'oxlint'

export default defineConfig({
    plugins: ['import', 'typescript', 'unicorn'],

    ignorePatterns: ['**/*.{mjs,cjs,js,d.ts,d.mts}', '.next'],
    overrides: [
        {
            files: ['*.test.ts', '*.spec.ts'],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
    ],
    rules: {
        eqeqeq: 'warn',
        'no-thenable': 'off',
    },
})
