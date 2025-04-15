import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: 'res|next|^err' }],
      'arrow-body-style': ['error', 'as-needed'],
      'no-param-reassign': ['error', { props: false }],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'func-names': 'off',
      'space-unary-ops': 'error',
      'space-in-parens': 'error',
      'space-infix-ops': 'error',
      'comma-dangle': 'off',
      'max-len': 'off',
      'import/extensions': 'off',
      'no-underscore-dangle': 'off',
      'consistent-return': 'off',
      radix: 'off',
      'no-shadow': [
        'error',
        {
          hoist: 'all',
          allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
        },
      ],
      'no-unused-expressions': 'off',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs'],
        },
      },
    },
  },
  // Prettier config to disable conflicting ESLint rules
  prettierConfig,
];
