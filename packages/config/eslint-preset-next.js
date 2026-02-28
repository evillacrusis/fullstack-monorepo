/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [require.resolve('./eslint-preset'), 'next/core-web-vitals'],
  rules: {
    // Next.js requires default exports for pages/layouts
    'import/no-default-export': 'off',
    // Disable the base no-console because Next.js server logs are acceptable
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
  },
};
