module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-plugin-import/recommended',
    './.eslintrc-auto-import.json',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-undef': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          { pattern: 'vue', group: 'builtin', position: 'after' },
          { pattern: 'vite', group: 'builtin', position: 'after' },
          { pattern: '~/app/**', group: 'internal', position: 'after' },
          { pattern: '~/pages/**', group: 'internal', position: 'after' },
          { pattern: '~/widgets/**', group: 'internal', position: 'after' },
          { pattern: '~/features/**', group: 'internal', position: 'after' },
          { pattern: '~/entities/**', group: 'internal', position: 'after' },
          { pattern: '~/shared/**', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
  overrides: [
    {
      files: ['./src/**/*.vue'],
      extends: [],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.vue'],
      },
      plugins: ['@typescript-eslint/eslint-plugin', 'vue'],
      rules: {
        'vue/attributes-order': 'error',
        'vue/valid-template-root': 'warn',
        'vue/prefer-true-attribute-shorthand': 'error',
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/html-indent': ['warn', 2],
        'vue/v-slot-style': 'off',
        'vue/no-unused-vars': 'off',
        'vue/multi-word-component-names': 'error',
        'vue/no-reserved-component-names': 'off',
        'vue/singleline-html-element-content-newline': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
