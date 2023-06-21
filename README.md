# precato-ignite

.eslintrc.json
``
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["airbnb-base", "eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["prettier", "@typescript-eslint"],
  "rules": {
    "camelcase": "off"
  }
}
`` 
