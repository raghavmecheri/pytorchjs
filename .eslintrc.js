module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/named': 0,
    'max-len': ['error', { code: 200 }],
    'max-classes-per-file': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0
  },
};
