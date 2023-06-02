module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: true,
        tabWidth: 2,
        trailingComma: "all",
        printWidth: 300,
        bracketSpacing: true,
        endOfLine: "auto",
      },
    ],
  },
};
