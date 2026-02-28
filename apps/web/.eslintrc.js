module.exports = {
  extends: ['@repo/config/eslint-preset-next'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
