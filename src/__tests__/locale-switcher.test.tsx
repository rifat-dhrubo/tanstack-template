import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockSetLocale = vi.fn();
let mockLocale = 'en';

vi.mock('@/integrations/i18n/locale-store', () => ({
	useLocale: (
		selector?: (state: {
			locale: string;
			setLocale: (tag: string) => void;
		}) => unknown,
	) => {
		const state = { locale: mockLocale, setLocale: mockSetLocale };
		return selector ? selector(state) : state;
	},
}));

vi.mock('@/paraglide/messages', () => ({
	$locale: vi.fn(
		(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			_params: Record<string, never> = {},
			options: { locale?: string } = {},
		) => {
			const tag = options.locale ?? mockLocale;
			return tag === 'en' ? 'English' : 'Deutsch';
		},
	),
}));

vi.mock('@/components/ui/button', () => ({
	Button: ({
		children,
		...props
	}: Record<'children', React.ReactNode> & Record<string, unknown>) => (
		<button {...props}>{children as React.ReactNode}</button>
	),
}));

import { LocaleSwitcher } from '@/integrations/i18n/locale-switcher';

describe('LocaleSwitcher', () => {
	beforeEach(() => {
		mockLocale = 'en';
		mockSetLocale.mockReset();
	});

	it('renders the trigger button with the current locale label', () => {
		render(<LocaleSwitcher />);
		expect(screen.getByRole('button')).toBeDefined();
		expect(screen.getByText('English')).toBeDefined();
	});

	it('renders the current locale label in German when locale is de', () => {
		mockLocale = 'de';
		render(<LocaleSwitcher />);
		expect(screen.getByText('Deutsch')).toBeDefined();
	});

	it('shows locale options when the trigger is clicked', async () => {
		const user = userEvent.setup();
		render(<LocaleSwitcher />);

		await user.click(screen.getByRole('button'));

		// Both locale labels should appear in the dropdown
		// getAllByText is used because "English" also appears in the trigger button
		expect(screen.getAllByText('English').length).toBeGreaterThanOrEqual(1);
		expect(screen.getByText('Deutsch')).toBeDefined();
	});

	it('disables the active locale option', async () => {
		const user = userEvent.setup();
		render(<LocaleSwitcher />);

		await user.click(screen.getByRole('button'));

		// The active locale (English) should be disabled
		const items = screen.getAllByRole('menuitemradio');
		const enItem = items.find((item) => item.textContent?.includes('English'));
		const deItem = items.find((item) => item.textContent?.includes('Deutsch'));

		expect(enItem).toBeDefined();
		expect(deItem).toBeDefined();
		expect((enItem as HTMLElement).hasAttribute('data-disabled')).toBe(true);
		expect((deItem as HTMLElement).hasAttribute('data-disabled')).toBe(false);
	});

	it('calls setLocale with the new locale when selecting a different language', async () => {
		const user = userEvent.setup();
		render(<LocaleSwitcher />);

		await user.click(screen.getByRole('button'));

		// Click the German option
		await user.click(screen.getByText('Deutsch'));

		expect(mockSetLocale).toHaveBeenCalledWith('de');
	});

	it('does not call setLocale when selecting the already active locale', async () => {
		const user = userEvent.setup();
		render(<LocaleSwitcher />);

		await user.click(screen.getByRole('button'));

		// The current locale item is disabled — it can't be clicked
		const items = screen.getAllByRole('menuitemradio');
		const englishItem = items.find((item) =>
			item.textContent?.includes('English'),
		);
		expect(englishItem).toBeDefined();
		expect((englishItem as HTMLElement).hasAttribute('data-disabled')).toBe(
			true,
		);

		mockSetLocale.mockClear();
	});

	it('renders both en and de from the available language tags', async () => {
		const user = userEvent.setup();
		render(<LocaleSwitcher />);

		await user.click(screen.getByRole('button'));

		const items = screen.getAllByRole('menuitemradio');
		expect(items).toHaveLength(2);

		const labels = items.map((item) => item.textContent);
		expect(labels).toContain('English');
		expect(labels).toContain('Deutsch');
	});
});
