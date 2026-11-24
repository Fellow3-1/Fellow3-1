import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    ignores: ['dist/**', 'docs/**', 'node_modules/**', '.agents/**', 'skills/**'],
  },
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      /* Fast Refresh only works when a file exports components alone. Warn
         everywhere, then opt out where the extra export is deliberate. */
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    /* App.jsx exports the useReveals hook next to the tree; Contact.jsx
       exports validateDraft/deliver so the smoke tests can exercise the real
       rules. Both are deliberate and neither breaks the production build. */
    files: ['src/App.jsx', 'src/components/Contact.jsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
]
