const { eslint } = require('@siberiacancode/eslint');

module.exports = {
  ...eslint.react,
  overrides: [
    ...eslint.react.overrides,
    {
      files: ['*.ts'],
      parserOptions: {
        tsconfigRootDir: __dirname
      },
      rules: {
        '@typescript-eslint/no-unsafe-call': 'off'
      }
    }
  ]
};