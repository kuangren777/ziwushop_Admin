module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		node: true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
	],
	"overrides": [
	],
	"parser": "vue-eslint-parser",
	"parserOptions": {
		"parser": "@typescript-eslint/parser",
		"ecmaVersion": "latest"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows",
			'0'
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
	}
};
