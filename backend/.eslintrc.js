module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    AnalysisView: true,
    PollingView: true,
    Prism: true,
    Spinner: true,
    Timer: true,
    moment: true
  },
  // parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  // plugins: [],
  rules: {
    'no-console': 'off' // "warn" // "off"
  },
  settings: {}
}
