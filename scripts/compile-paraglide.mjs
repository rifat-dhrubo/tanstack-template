import { compile } from '@inlang/paraglide-js';

await compile({
	project: './project.inlang',
	outdir: './src/paraglide',
	strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
	urlPatterns: [
		{
			pattern: '/:path(.*)?',
			localized: [
				['en', '/en/:path(.*)?'],
				['de', '/de/:path(.*)?'],
			],
		},
	],
});
