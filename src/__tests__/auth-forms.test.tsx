import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('@tanstack/react-router', () => ({
	Link: ({ children, to, ...props }: Record<string, unknown>) => (
		<a href={to as string} {...props}>
			{children as React.ReactNode}
		</a>
	),
}));

describe('SignInForm', () => {
	beforeEach(async () => {
		const { SignInForm } =
			await import('@/features/auth/sign-in/components/sign-in-form');
		render(<SignInForm />);
	});

	it('renders email and password fields', () => {
		expect(screen.getByLabelText(/email/i)).toBeDefined();
		expect(screen.getByLabelText(/^password$/i)).toBeDefined();
	});

	it('renders sign-in button', () => {
		expect(screen.getByRole('button', { name: /sign in/i })).toBeDefined();
	});

	it('shows error for invalid email on interaction', async () => {
		const user = userEvent.setup();
		const emailInput = screen.getByLabelText(/email/i);
		await user.type(emailInput, 'invalid-email');
		const errorMessage = await screen.findByText(
			'Please enter a valid email address',
		);
		expect(errorMessage).toBeDefined();
	});

	it('shows error for empty password on interaction', async () => {
		const user = userEvent.setup();
		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/^password$/i);
		await user.type(emailInput, 'test@example.com');
		await user.type(passwordInput, 'a');
		await user.clear(passwordInput);
		const errorMessage = await screen.findByText('Password is required');
		expect(errorMessage).toBeDefined();
	});

	it('reaches submit stub with valid data', async () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
		const user = userEvent.setup();
		await user.type(screen.getByLabelText(/email/i), 'user@example.com');
		await user.type(screen.getByLabelText(/^password$/i), 'password123');
		await user.click(screen.getByRole('button', { name: /sign in/i }));
		await new Promise((resolve) => setTimeout(resolve, 1500));
		expect(spy).toHaveBeenCalledWith('Sign in:', {
			email: 'user@example.com',
			password: 'password123',
		});
		spy.mockRestore();
	}, 10000);
});

describe('SignUpForm', () => {
	beforeEach(async () => {
		const { SignUpForm } =
			await import('@/features/auth/sign-up/components/sign-up-form');
		render(<SignUpForm />);
	});

	it('renders all fields', () => {
		expect(screen.getByLabelText(/name/i)).toBeDefined();
		expect(screen.getByLabelText(/email/i)).toBeDefined();
		expect(screen.getByLabelText(/^password$/i)).toBeDefined();
		expect(screen.getByLabelText(/confirm password/i)).toBeDefined();
	});

	it('renders create account button', () => {
		expect(
			screen.getByRole('button', { name: /create account/i }),
		).toBeDefined();
	});

	it('shows error for short password', async () => {
		const user = userEvent.setup();
		const passwordInput = screen.getByLabelText(/^password$/i);
		await user.type(passwordInput, 'short');
		const errorMessage = await screen.findByText(
			'Password must be at least 8 characters',
		);
		expect(errorMessage).toBeDefined();
	});

	it('reaches submit stub with valid data', async () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
		const user = userEvent.setup();
		await user.type(screen.getByLabelText(/name/i), 'Test User');
		await user.type(screen.getByLabelText(/email/i), 'user@example.com');
		await user.type(screen.getByLabelText(/^password$/i), 'password123');
		await user.type(screen.getByLabelText(/confirm password/i), 'password123');
		await user.click(screen.getByRole('button', { name: /create account/i }));
		await new Promise((resolve) => setTimeout(resolve, 1500));
		expect(spy).toHaveBeenCalledWith('Sign up:', {
			name: 'Test User',
			email: 'user@example.com',
			password: 'password123',
			confirmPassword: 'password123',
		});
		spy.mockRestore();
	}, 10000);
});
