const eslint = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const globals = require("globals");

module.exports = [
  eslint.configs.recommended,
  ...tseslint.configs["flat/recommended"],
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
  },
];
