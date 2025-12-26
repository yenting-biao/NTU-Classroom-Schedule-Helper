import nextConfig from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

const eslintConfig = [
  ...nextConfig,
  prettierConfig,
  {
    rules: {
      "no-const-assign": "error",
      "no-undef": "error",
      "no-var": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
