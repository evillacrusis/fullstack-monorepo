module.exports = {
  extends: ['@repo/config/eslint-preset'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // NestJS requires class methods, decorators, etc.
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/no-default-export': 'off',
  },
};
