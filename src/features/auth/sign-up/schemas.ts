import { z } from 'zod';

import * as m from '@/paraglide/messages';

export const signUpSchema = z
	.object({
		name: z.string().min(1, m.validation_name_required()),
		email: z.string().email(m.validation_invalid_email()),
		password: z.string().min(8, m.validation_password_min_length()),
		confirmPassword: z
			.string()
			.min(1, m.validation_confirm_password_required()),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: m.validation_passwords_must_match(),
		path: ['confirmPassword'],
	});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
