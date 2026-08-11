// eslint-config-next 16 ships native flat configs, so this no longer goes
// through @eslint/eslintrc's FlatCompat shim — that path threw
// "Converting circular structure to JSON" and made `next lint` unrunnable.
// `core-web-vitals` already bundles `next` and `next/typescript`.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    // Scoped to TS — the @typescript-eslint plugin is only registered for these
    // files, and referencing its rules from an unscoped object fails to resolve.
    // Must match `next/typescript`'s own glob exactly — it registers the
    // plugin only for these, so a wider glob (e.g. .mts) fails to resolve.
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    ignores: [
      '.next/',
      'src/payload-types.ts',
      'src/payload-generated-schema.ts',
      'src/migrations/',
    ],
  },
]

export default eslintConfig
