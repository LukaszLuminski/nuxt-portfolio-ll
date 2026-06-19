import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-config-prettier'

export default withNuxt(
  {
    rules: {
      eqeqeq: ['error', 'always'],
      'no-else-return': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': ['error', { array: false, object: true }]
    }
  },
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      parserOptions: {
        projectService: true
      }
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports', prefer: 'type-imports' }
      ],
      '@typescript-eslint/no-unnecessary-type-assertion': 'error'
    }
  },
  prettier
)
