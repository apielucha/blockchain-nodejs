module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'prettier', 'plugin:flowtype/recommended'],
  plugins: ['prettier', 'flowtype'],
  rules: {
    'prettier/prettier': ['error'],
  },
};
