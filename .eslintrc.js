module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
    webextensions: true
  },
  rules: {
    semi: 0,
    'max-len': 0,
    'no-console': 0,
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': ['**/*.test.js', '**/*.mock.js']
    }]
  },
  globals: {
    __DEV__: true
  },
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  }
}
