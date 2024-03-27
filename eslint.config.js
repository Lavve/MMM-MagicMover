const globals = require('globals');
const {configs: eslintConfigs} = require('@eslint/js');
const eslintPluginStylistic = require('@stylistic/eslint-plugin');

const config = [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        Log: 'readonly',
        Module: 'readonly'
      }
    },
    plugins: {
      ...eslintPluginStylistic.configs['all-flat'].plugins
    },
    rules: {
      ...eslintConfigs.all.rules,
      ...eslintPluginStylistic.configs['all-flat'].rules,
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/comma-dangle': ['error', 'only-multiline'],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/function-paren-newline': ['error', 'consistent'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/no-extra-parens': ['error', 'functions'],
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/quotes': ['error', 'single'],
      'default-case': 'off',
      'id-length': 'off',
      'no-bitwise': ['error', {allow: ['~']}],
      'no-magic-numbers': 'off',
      'no-nested-ternary': 'off',
      'no-ternary': 'off',
      'one-var': 'off',
      'sort-keys': 'off',
    }
  }
];

/*
 * Set debug to true for testing purposes.
 * Since some plugins have not yet been optimized for the flat config,
 * we will be able to optimize this file in the future. It can be helpful
 * to write the ESLint config to a file and compare it after changes.
 */
const debug = false;

if (debug === true) {
  const FileSystem = require('node:fs');
  FileSystem.writeFile('eslint-config-DEBUG.json', JSON.stringify(config, null, 2), (error) => {
    if (error) {
      throw error;
    }
  });
}

module.exports = config;
