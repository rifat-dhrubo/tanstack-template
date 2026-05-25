import { signInSchema } from '@/features/auth/sign-in/schemas';
import { signUpSchema } from '@/features/auth/sign-up/schemas';
import * as m from '@/paraglide/messages';

describe('signInSchema', () => {
	it('rejects empty email', () => {
		const result = signInSchema.safeParse({ email: '', password: 'pass' });
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0]?.message).toBe(
				m.validation_invalid_email(),
			);
		}
	});

	it('rejects invalid email format', () => {
		const result = signInSchema.safeParse({
			email: 'not-an-email',
			password: 'pass',
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0]?.message).toBe(
				m.validation_invalid_email(),
			);
		}
	});

	it('rejects missing password', () => {
		const result = signInSchema.safeParse({
			email: 'test@example.com',
			password: '',
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0]?.message).toBe(
				m.validation_password_required(),
			);
		}
	});

	it('accepts valid email and password', () => {
		const result = signInSchema.safeParse({
			email: 'user@example.com',
			password: 'secure123',
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toEqual({
				email: 'user@example.com',
				password: 'secure123',
			});
		}
	});
});

describe('signUpSchema', () => {
	it('rejects password shorter than 8 characters', () => {
		const result = signUpSchema.safeParse({
			name: 'Test User',
			email: 'user@example.com',
			password: '1234567',
			confirmPassword: '1234567',
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0]?.message).toBe(
				m.validation_password_min_length(),
			);
		}
	});

	it('rejects password mismatch', () => {
		const result = signUpSchema.safeParse({
			name: 'Test User',
			email: 'user@example.com',
			password: '12345678',
			confirmPassword: '87654321',
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0]?.message).toBe(
				m.validation_passwords_must_match(),
			);
		}
	});

	it('rejects empty name', () => {
		const result = signUpSchema.safeParse({
			name: '',
			email: 'user@example.com',
			password: '12345678',
			confirmPassword: '12345678',
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0]?.message).toBe(
				m.validation_name_required(),
			);
		}
	});

	it('accepts valid sign-up input', () => {
		const result = signUpSchema.safeParse({
			name: 'Test User',
			email: 'user@example.com',
			password: 'password123',
			confirmPassword: 'password123',
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toEqual({
				name: 'Test User',
				email: 'user@example.com',
				password: 'password123',
				confirmPassword: 'password123',
			});
		}
	});
});
