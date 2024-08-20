import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importLint from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importLint,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies},
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': [
        'warn',
        { allow: ['constructors'] },
      ],
      '@typescript-eslint/semi': 0,
      '@typescript-eslint/comma-dangle': [0],
      '@typescript-eslint/no-use-before-define': [0],
      '@typescript-eslint/no-unused-vars': [1],
      '@typescript-eslint/naming-convention': [1],
      '@typescript-eslint/no-explicit-any': [1],
      'import/prefer-default-export': 0,
      'comma-dangle': 'off',
      'react/button-has-type': [0],
      'jsx-a11y/alt-text': [1],
      'no-console': [2],
      'react/prop-types': [0],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: false,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
    },
  }
)
