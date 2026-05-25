import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as m from '@/paraglide/messages';

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
		expect(screen.getByLabelText(m.auth_email_label())).toBeDefined();
		expect(screen.getByLabelText(m.auth_password_label())).toBeDefined();
	});

	it('renders sign-in button', () => {
		expect(
			screen.getByRole('button', { name: m.auth_sign_in_button() }),
		).toBeDefined();
	});

	it('shows error for invalid email on interaction', async () => {
		const user = userEvent.setup();
		const emailInput = screen.getByLabelText(m.auth_email_label());
		await user.type(emailInput, 'invalid-email');
		const errorMessage = await screen.findByText(m.validation_invalid_email());
		expect(errorMessage).toBeDefined();
	});

	it('shows error for empty password on interaction', async () => {
		const user = userEvent.setup();
		const emailInput = screen.getByLabelText(m.auth_email_label());
		const passwordInput = screen.getByLabelText(m.auth_password_label());
		await user.type(emailInput, 'test@example.com');
		await user.type(passwordInput, 'a');
		await user.clear(passwordInput);
		const errorMessage = await screen.findByText(
			m.validation_password_required(),
		);
		expect(errorMessage).toBeDefined();
	});

	it('reaches submit stub with valid data', async () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
		const user = userEvent.setup();
		await user.type(
			screen.getByLabelText(m.auth_email_label()),
			'user@example.com',
		);
		await user.type(
			screen.getByLabelText(m.auth_password_label()),
			'password123',
		);
		await user.click(
			screen.getByRole('button', { name: m.auth_sign_in_button() }),
		);
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
		expect(screen.getByLabelText(m.auth_name_label())).toBeDefined();
		expect(screen.getByLabelText(m.auth_email_label())).toBeDefined();
		expect(screen.getByLabelText(m.auth_password_label())).toBeDefined();
		expect(
			screen.getByLabelText(m.auth_confirm_password_label()),
		).toBeDefined();
	});

	it('renders create account button', () => {
		expect(
			screen.getByRole('button', { name: m.auth_sign_up_button() }),
		).toBeDefined();
	});

	it('shows error for short password', async () => {
		const user = userEvent.setup();
		const passwordInput = screen.getByLabelText(m.auth_password_label());
		await user.type(passwordInput, 'short');
		const errorMessage = await screen.findByText(
			m.validation_password_min_length(),
		);
		expect(errorMessage).toBeDefined();
	});

	it('reaches submit stub with valid data', async () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
		const user = userEvent.setup();
		await user.type(screen.getByLabelText(m.auth_name_label()), 'Test User');
		await user.type(
			screen.getByLabelText(m.auth_email_label()),
			'user@example.com',
		);
		await user.type(
			screen.getByLabelText(m.auth_password_label()),
			'password123',
		);
		await user.type(
			screen.getByLabelText(m.auth_confirm_password_label()),
			'password123',
		);
		await user.click(
			screen.getByRole('button', { name: m.auth_sign_up_button() }),
		);
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
