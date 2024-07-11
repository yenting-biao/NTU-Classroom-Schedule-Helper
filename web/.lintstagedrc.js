// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details
/* eslint-disable */
const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --max-warnings=0 --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .filter((f) => f !== ".lintstagedrc.js")
    .join(" --file ")}`;

const prettierCommand = (filenames) =>
  `prettier --write ${filenames.join(" ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, prettierCommand],
};
