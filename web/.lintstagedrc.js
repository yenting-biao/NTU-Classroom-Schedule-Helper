// .lintstagedrc.js
// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details
const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --strict --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const prettierCommand = (filenames) =>
  `prettier --write ${filenames.join(" ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, prettierCommand],
};
