import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

const DEEP_RELATIVE_IMPORT = {
  group: ['../../*'],
  message:
    'Deep relative imports are forbidden. Use path aliases (@app, @components, @domains, @shared, @infrastructure, @styles, @lib).',
};

const DEXIE_IMPORT = {
  group: ['dexie', 'dexie/*'],
  message:
    'Dexie may only be imported inside src/infrastructure. The UI and domains must go through repositories (docs/03_DATA_LAYER.md §8).',
};

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage'] },

  // Base: applies to every TypeScript source file.
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Architecture contract: no `any`, no unused symbols.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],

      // No direct Dexie usage outside infrastructure + no deep relative imports.
      'no-restricted-imports': ['error', { patterns: [DEXIE_IMPORT, DEEP_RELATIVE_IMPORT] }],
    },
  },

  // Infrastructure is the ONLY layer allowed to touch Dexie directly.
  {
    files: ['src/infrastructure/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [DEEP_RELATIVE_IMPORT] }],
    },
  },

  // shared/ is generic and MUST NOT depend on any domain (docs/02_ARCHITECTURE.md §7).
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            DEXIE_IMPORT,
            DEEP_RELATIVE_IMPORT,
            {
              group: ['@domains', '@domains/*', '**/domains/*'],
              message: 'shared/ must not import from domains/. Shared code is generic only.',
            },
          ],
        },
      ],
    },
  },

  // Config files run in Node and are not part of the typed src program.
  {
    files: ['*.{js,ts}', 'vite.config.ts'],
    extends: [js.configs.recommended],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
  },

  prettier,
);
