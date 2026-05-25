import { render, screen } from '@testing-library/react';

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
		expect(screen.getByText(/build modern web apps/i)).toBeDefined();
	});

	it('renders the TanStack Template title', () => {
		expect(screen.getByText(/tanstack template/i)).toBeDefined();
	});

	it('renders the features section', () => {
		expect(screen.getByText(/what's included/i)).toBeDefined();
	});

	it('renders sign-in and sign-up links', () => {
		const signInLinks = screen.getAllByText(/sign in/i);
		const signUpLinks = screen.getAllByText(/sign up/i);
		expect(signInLinks.length).toBeGreaterThan(0);
		expect(signUpLinks.length).toBeGreaterThan(0);
	});
});
