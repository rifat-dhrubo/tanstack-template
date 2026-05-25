import { deLocalizeUrl, localizeUrl } from '@/paraglide/runtime.js';

describe('i18n routing', () => {
	describe('localizeUrl', () => {
		it('localizes root path for en', () => {
			const result = localizeUrl('http://localhost:3210/', { locale: 'en' });
			expect(result.pathname).toBe('/en/');
		});

		it('localizes root path for de', () => {
			const result = localizeUrl('http://localhost:3210/', { locale: 'de' });
			expect(result.pathname).toBe('/de/');
		});

		it('localizes /sign-in for en', () => {
			const result = localizeUrl('http://localhost:3210/sign-in', {
				locale: 'en',
			});
			expect(result.pathname).toBe('/en/sign-in');
		});

		it('localizes /sign-in for de', () => {
			const result = localizeUrl('http://localhost:3210/sign-in', {
				locale: 'de',
			});
			expect(result.pathname).toBe('/de/sign-in');
		});

		it('localizes /sign-up for en', () => {
			const result = localizeUrl('http://localhost:3210/sign-up', {
				locale: 'en',
			});
			expect(result.pathname).toBe('/en/sign-up');
		});

		it('localizes /sign-up for de', () => {
			const result = localizeUrl('http://localhost:3210/sign-up', {
				locale: 'de',
			});
			expect(result.pathname).toBe('/de/sign-up');
		});
	});

	describe('deLocalizeUrl', () => {
		it('delocalizes /en to /', () => {
			const result = deLocalizeUrl('http://localhost:3210/en');
			expect(result.pathname).toBe('/');
		});

		it('delocalizes /de to /', () => {
			const result = deLocalizeUrl('http://localhost:3210/de');
			expect(result.pathname).toBe('/');
		});

		it('delocalizes /en/sign-in to /sign-in', () => {
			const result = deLocalizeUrl('http://localhost:3210/en/sign-in');
			expect(result.pathname).toBe('/sign-in');
		});

		it('delocalizes /de/sign-in to /sign-in', () => {
			const result = deLocalizeUrl('http://localhost:3210/de/sign-in');
			expect(result.pathname).toBe('/sign-in');
		});

		it('delocalizes /en/sign-up to /sign-up', () => {
			const result = deLocalizeUrl('http://localhost:3210/en/sign-up');
			expect(result.pathname).toBe('/sign-up');
		});

		it('delocalizes /de/sign-up to /sign-up', () => {
			const result = deLocalizeUrl('http://localhost:3210/de/sign-up');
			expect(result.pathname).toBe('/sign-up');
		});

		it('keeps non-localized path unchanged', () => {
			const result = deLocalizeUrl('http://localhost:3210/sign-in');
			expect(result.pathname).toBe('/sign-in');
		});
	});

	describe('round-trip', () => {
		it('localize then delocalize returns original path (en)', () => {
			const url = 'http://localhost:3210/sign-in';
			const localized = localizeUrl(url, { locale: 'en' });
			const delocalized = deLocalizeUrl(localized.href);
			expect(delocalized.pathname).toBe('/sign-in');
		});

		it('localize then delocalize returns original path (de)', () => {
			const url = 'http://localhost:3210/sign-up';
			const localized = localizeUrl(url, { locale: 'de' });
			const delocalized = deLocalizeUrl(localized.href);
			expect(delocalized.pathname).toBe('/sign-up');
		});

		it('switches from de localized URL to en localized URL', () => {
			const deUrl = 'http://localhost:3210/de/sign-in';
			const delocalized = deLocalizeUrl(deUrl);
			const enUrl = localizeUrl(delocalized.href, { locale: 'en' });
			expect(enUrl.pathname).toBe('/en/sign-in');
		});

		it('switches from en localized URL to de localized URL', () => {
			const enUrl = 'http://localhost:3210/en/sign-in';
			const delocalized = deLocalizeUrl(enUrl);
			const deUrl = localizeUrl(delocalized.href, { locale: 'de' });
			expect(deUrl.pathname).toBe('/de/sign-in');
		});
	});
});
