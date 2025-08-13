import js from '@eslint/js';
import globals from 'globals';
import markdown from '@eslint/markdown';

export default [
  {
    ...js.configs.recommended,
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    ignores: ['**/*.d.ts'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  ...markdown.configs.recommended,
];
