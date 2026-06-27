const js = require('@eslint/js');
const nextPlugin = require('@next/eslint-plugin-next');
const importPlugin = require('eslint-plugin-import');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

const tsFiles = ['apps/**/*.ts', 'apps/**/*.tsx', 'packages/**/*.ts', 'packages/**/*.tsx'];

const typeCheckedRules = {
  ...tsPlugin.configs.recommended.rules,
  ...tsPlugin.configs['recommended-requiring-type-checking'].rules,
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-unused-vars': [
    'error',
    { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
  ],
  '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/no-misused-promises': 'error',
  '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
  '@typescript-eslint/prefer-nullish-coalescing': 'warn',
  '@typescript-eslint/prefer-optional-chain': 'warn',
  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/strict-boolean-expressions': [
    'error',
    {
      allowString: false,
      allowNumber: false,
      allowNullableObject: true,
    },
  ],
};

const importRules = {
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    },
  ],
  'import/no-cycle': 'error',
  'import/no-default-export': 'warn',
};

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**',
      'packages/*/src/**/*.js',
      'packages/*/src/**/*.js.map',
      'packages/*/src/**/*.d.ts',
      'packages/*/src/**/*.d.ts.map',
    ],
  },
  js.configs.recommended,
  {
    files: tsFiles,
    languageOptions: {
      parser: tsParser,
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['apps/*/tsconfig.json', 'packages/*/tsconfig.json'],
        },
      },
    },
    rules: {
      ...typeCheckedRules,
      ...importRules,
      'no-undef': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
    },
  },
  {
    files: ['apps/api/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['apps/web/**/*.ts', 'apps/web/**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'import/no-default-export': 'off',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    },
  },
];
