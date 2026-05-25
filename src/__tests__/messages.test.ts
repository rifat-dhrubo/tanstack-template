import * as m from '@/paraglide/messages';

const requiredKeys = [
	'home_nav_title',
	'home_hero_badge',
	'home_hero_title_1',
	'home_hero_title_2',
	'home_hero_description',
	'home_docs_link',
	'home_features_title',
	'home_features_description',
	'home_getting_started_title',
	'home_getting_started_description',
	'home_footer_text',
	'home_feature_router_title',
	'home_feature_router_description',
	'home_feature_query_title',
	'home_feature_query_description',
	'home_feature_typescript_title',
	'home_feature_typescript_description',
	'home_feature_shadcn_title',
	'home_feature_shadcn_description',
	'home_feature_tailwind_title',
	'home_feature_tailwind_description',
	'nav_sign_in',
	'nav_sign_up',
	'auth_sign_in_title',
	'auth_sign_in_description',
	'auth_sign_up_title',
	'auth_sign_up_description',
	'auth_email_label',
	'auth_email_placeholder',
	'auth_password_label',
	'auth_forgot_password',
	'auth_sign_in_button',
	'auth_no_account',
	'auth_sign_up_link',
	'auth_sign_up_button',
	'auth_name_label',
	'auth_name_placeholder',
	'auth_confirm_password_label',
	'auth_has_account',
	'auth_sign_in_link',
	'validation_invalid_email',
	'validation_password_required',
	'validation_name_required',
	'validation_password_min_length',
	'validation_confirm_password_required',
	'validation_passwords_must_match',
] as const;

describe('Paraglide messages', () => {
	it('exports all required starter and auth message keys', () => {
		for (const key of requiredKeys) {
			expect(m).toHaveProperty(key);
		}
	});

	it('returns non-empty strings for all message keys (English)', () => {
		for (const key of requiredKeys) {
			const fn = m[key as keyof typeof m] as
				| ((...args: never[]) => string)
				| undefined;
			if (typeof fn === 'function') {
				const result =
					fn.length > 0
						? // eslint-disable-next-line @typescript-eslint/no-explicit-any
							(fn as any)({ ecosystem: 'TanStack ecosystem' })
						: (fn as () => string)();
				expect(typeof result).toBe('string');
				expect(result.length).toBeGreaterThan(0);
			}
		}
	});

	it('home_footer_text is parameterized and accepts ecosystem', () => {
		const result = m.home_footer_text({ ecosystem: 'TanStack ecosystem' });
		expect(typeof result).toBe('string');
		expect(result).toContain('TanStack ecosystem');
	});
});
