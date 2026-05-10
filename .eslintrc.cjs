module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.app.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['dist', 'vite.config.ts', 'vitest.config.ts'],
  rules: {
    'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
  },
};
