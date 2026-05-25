import { render, screen } from '@testing-library/react';

import * as m from '@/paraglide/messages';

vi.mock('@tanstack/react-router', () => ({
	Link: ({ children, to, ...props }: Record<string, unknown>) => (
		<a href={to as string} {...props}>
			{children as React.ReactNode}
		</a>
	),
}));

describe('HomePage', () => {
	beforeEach(async () => {
		const { HomePage } = await import('@/features/home/components/home-page');
		render(<HomePage />);
	});

	it('renders the heading', () => {
		expect(screen.getByText(m.home_hero_title_1())).toBeDefined();
	});

	it('renders the TanStack Template title', () => {
		expect(screen.getByText(m.home_nav_title())).toBeDefined();
	});

	it('renders the features section', () => {
		expect(screen.getByText(m.home_features_title())).toBeDefined();
	});

	it('renders sign-in and sign-up links', () => {
		const signInLinks = screen.getAllByText(m.nav_sign_in());
		const signUpLinks = screen.getAllByText(m.nav_sign_up());
		expect(signInLinks.length).toBeGreaterThan(0);
		expect(signUpLinks.length).toBeGreaterThan(0);
	});

	it('renders parameterized footer text', () => {
		expect(
			screen.getByText(m.home_footer_text({ ecosystem: 'TanStack ecosystem' })),
		).toBeDefined();
	});
});
