module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'plugin:vue/essential',
		'airbnb-base',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: [
		'vue',
	],
	rules: {
		'no-tabs': 0,
		'no-console': 0,
		'max-len': 0,
		'no-unused-vars': 0,
		indent: ['error', 'tab'],
		'no-return-assign': 0,
		'no-param-reassign': 0,
		'no-underscore-dangle': 0,
		'no-restricted-syntax': 0,
		'guard-for-in': 0,
		'func-names': 0,
	},
};
