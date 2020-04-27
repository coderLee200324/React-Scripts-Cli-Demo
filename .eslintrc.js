module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-console": "off",
    quotes: [1, "double"],
    "arrow-parens": 0,
    "import/no-dynamic-require": 0,
    "global-require": 0,
    "comma-dangle": [2, "only-multiline"],
  },
};
