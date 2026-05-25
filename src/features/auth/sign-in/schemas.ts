import { z } from 'zod';

import * as m from '@/paraglide/messages';

export const signInSchema = z.object({
	email: z.string().email(m.validation_invalid_email()),
	password: z.string().min(1, m.validation_password_required()),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
