module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2017,
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true
    },
    'sourceType': 'module'
  },
  "rules": {
    "indent": [
      "error", 2
    ],
    "quotes": [
      "error", "single"
    ],
    "semi": ["error", "never"]
  }
}
