module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:sonarjs/recommended',
    'plugin:jest/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  settings: {
    "import/resolver": {
      "typescript": {}
    },
  },

  plugins: [
    '@typescript-eslint',
    'sonarjs',
    'jest'
  ],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never"
      }
    ],
    'no-underscore-dangle': [2, { "allow": ["__filename", "__dirname"] }],
    'import/prefer-default-export': 0,

    'no-await-in-loop': 0,
  },
};
