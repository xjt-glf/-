module.exports = {
  rules: {
    'no-console': 'off',
    "parser": "vue-eslint-parser"
  },
  parserOptions: {
    "ecmaVersion": 7,
    "sourceType": "module"
  },
  "vue/no-parsing-error": [
    2, 
    {
         "x-invalid-end-tag": false
     }
  ]
}
