module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      rules: {
        // JavaScript-specific rules

        // Example: Enforce the use of single quotes
        quotes: ["error", "single"],

        // Example: Enforce indentation with 2 spaces
        indent: ["error", 2],

        // Example: Disallow the use of var
        "no-var": "error",

        // Example: Require strict mode
        strict: ["error", "global"],

        // Example: Disallow unused variables
        "no-unused-vars": [
          "error",
          { vars: "all", args: "after-used", ignoreRestSiblings: false },
        ],
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
      ],
      parser: "@typescript-eslint/parser",
      rules: {
        // Add any TypeScript-specific rules here

        // Example: Enforce the use of single quotes
        quotes: ["error", "single"],

        // Example: Enforce indentation with 2 spaces
        indent: ["error", 2],

        // Example: Disallow the use of var
        "no-var": "error",

        // Example: Require strict mode
        strict: ["error", "global"],

        // Example: Disallow unused variables
        "no-unused-vars": [
          "error",
          { vars: "all", args: "after-used", ignoreRestSiblings: false },
        ],
      },
    },
  ],
};
