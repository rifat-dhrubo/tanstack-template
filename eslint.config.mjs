// @ts-check
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import eslint from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import reactHooks from 'eslint-plugin-react-hooks';
import { globalIgnores } from 'eslint/config';
import pluginRouter from '@tanstack/eslint-plugin-router';
import importPlugin from 'eslint-plugin-import-x';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import eslintConfigPrettier from 'eslint-config-prettier';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tsconfigPath = resolve(__dirname, './tsconfig.json');

export default tseslint.config(
	eslint.configs.recommended,
	reactPlugin.configs.flat.recommended,
	reactPlugin.configs.flat['jsx-runtime'],
	tseslint.configs.recommendedTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	reactHooks.configs.flat.recommended,
	jsxA11y.flatConfigs.recommended,
	globalIgnores(['./dist/', './node_modules/', './public/', './.output/']),

	{
		files: ['**/*.js', '**/*.mjs', 'dist/**/*.js', 'dist/**'],
		extends: [tseslint.configs.disableTypeChecked],
		settings: {
			react: { version: 'detect' },
		},
	},

	{
		files: ['**/*.ts', '**/*.tsx'],
		ignores: ['dist/**/*.ts', 'dist/**', '**/*.mjs', 'eslint.config.mjs'],
		languageOptions: {
			parserOptions: {
				project: [tsconfigPath],
				tsconfigRootDir: __dirname,
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			'@tanstack/router': pluginRouter,
			import: importPlugin,
			'sort-destructure-keys': sortDestructureKeys,
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: 'react',
							importNames: [
								'useState',
								'useEffect',
								'useMemo',
								'useRef',
								'useCallback',
								'useReducer',
								'useContext',
								'useLayoutEffect',
								'useInsertionEffect',
							],
							message:
								'Use React.<hook>() instead of named imports to match project conventions.',
						},
					],
				},
			],
			'no-restricted-syntax': [
				'error',
				{
					selector: "JSXExpressionContainer > LogicalExpression[operator='&&']",
					message:
						'Use a ternary (condition ? <Component /> : null) instead of && in JSX.',
				},
			],
			'import/no-default-export': 'error',
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/await-thenable': 'warn',
			'@typescript-eslint/only-throw-error': [
				'warn',
				{
					allow: ['Redirect', 'NotFoundError'],
					allowThrowingAny: false,
					allowThrowingUnknown: false,
				},
			],
			'import/no-cycle': 'off',

			'import/order': [
				'warn',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
					],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],

			'react/prop-types': 'off',
		},
	},

	{
		files: [
			'**/vite.config.ts',
			'**/orval.config.ts',
			'**/commitlint.config.ts',
			'**/prettier.config.mjs',
		],
		rules: { 'import/no-default-export': 'off' },
	},

	{
		files: ['**/*.test.*', '**/__tests__/**'],
		extends: [tseslint.configs.disableTypeChecked],
		languageOptions: {
			globals: {
				describe: 'readonly',
				it: 'readonly',
				test: 'readonly',
				expect: 'readonly',
				beforeEach: 'readonly',
				afterEach: 'readonly',
				beforeAll: 'readonly',
				afterAll: 'readonly',
				vi: 'readonly',
			},
		},
	},

	eslintConfigPrettier,
);
