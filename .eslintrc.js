const eslintrc = {
  extends: [require.resolve('@yueqing/lint/lib/ts-eslint')],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    // custom rules
    'no-bitwise': 'off',
  },
}

module.exports = eslintrc
