module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'plugin:flowtype/recommended', 'prettier'],
  plugins: ['prettier', 'flowtype'],
  rules: {
    'prettier/prettier': ['error'],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
  },
};
