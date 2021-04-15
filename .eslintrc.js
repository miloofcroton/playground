module.exports = {
  root: true,
  extends: [
		'eslint:recommended',
		// 'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    // 'react'
  ],
  // settings: {
	// 	react: {
	// 		version: 'detect'
	// 	}
  // },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    createDefaultProgram: false,
		sourceType: 'module',
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true
		}
  },
  env: {
    node: true,
		es6: true,
		jest: true,
		// browser: true,
    // 'cypress/globals': true,
  },
  // globals: {
  //   Cypress: true,
  //   cy: true,
  //   assert: true,
  // },
  rules: {

    // Prettier
    // 'prettier/prettier': 'warn',

		// ESLint
		'semi': ['error', 'always'],
		'indent': 'off',
		'quotes': ['error', 'single'],
    'max-len': ['off'],
    // 'max-len': ['error', { 'code': 120 }],
		'jsx-quotes': ['error', 'prefer-double'],
		'comma-dangle': ['error', 'only-multiline'],
		'object-curly-spacing': ['error', 'always'],
		'array-bracket-spacing': ['error', 'never'],
    // 'arrow-parens': ['warn', 'always'],
    'keyword-spacing': ['warn', {
      'before': true,
      'after': true
    }],
    'no-shadow': 'warn',
    'no-extra-boolean-cast': 'off',
		'no-case-declarations': 'error',
		'no-class-assign': 'error',
		'no-cond-assign': 'error',
		'no-console': ['warn', { 'allow': ['warn', 'error', 'info'] }],
		'no-constant-condition': 'error',
		'no-empty': 'error',
		'no-empty-pattern': 'warn',
		'no-extra-semi': 'off',
		'no-global-assign': 'error',
		'no-inner-declarations': 'error',
		'no-invalid-regexp': 'error',
		'no-mixed-requires': 'error',
		'no-mixed-spaces-and-tabs': 'error',
		'no-negated-in-lhs': 'error',
		'no-new-require': 'error',
		'no-path-concat': 'error',
		'no-proto': 'error',
		'no-regex-spaces': 'error',
		'no-restricted-modules': ['error', 'sys', '_linklist'],
		'no-sparse-arrays': 'error',
		'no-undef': 'off',  // using typescript plugin instead
		'no-unexpected-multiline': 'off',
		'no-unsafe-finally': 'error',
		'no-unsafe-negation': 'error',
		'no-unused-vars': 'off', // using typescript plugin instead
		'constructor-super': 'error',
		'prefer-const': 'error',
		'quote-props': 'off',
		'require-yield': 'error',
    'linebreak-style': ['error', 'unix'],

		// TypeScript-ESLint
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'args': 'none' }],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
		'@typescript-eslint/no-use-before-define': 'off',
    // '@typescript-eslint/camelcase': 'warn',
		'@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/member-delimiter-style': ['error', {
			'multiline': {
        'delimiter': 'semi',
        'requireLast': true
			},
			'singleline': {
					'delimiter': 'semi',
					'requireLast': true
			}
    }],


		// React
    // 'react/jsx-closing-bracket-location': 'off', // this helps keep jsx compact when using css props, but it may be problematic overall
		// 'react/jsx-uses-react': 'error',
		// 'react/jsx-key': 'error',
		// 'react/jsx-uses-vars': 'error',
		// 'react/prop-types': 'off',
		// 'react/react-in-jsx-scope': 'error',
		// 'react/display-name': 'off',
		// 'react/no-unescaped-entities': 'off',
    // 'react/no-children-prop': 'warn',
    // // 'react-hooks/exhaustive-deps': 'warn',

    // 'react/jsx-props-no-spreading': 'off',
    // 'react/jsx-curly-brace-presence': 'off',
    // 'react/prop-types': 'off',
    // 'react/jsx-wrap-multilines': 'off',
    // 'react/jsx-curly-newline': 'off',
    // 'react/jsx-indent': 'off',
  },
}
