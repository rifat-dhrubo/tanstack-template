import { create } from 'zustand';

import {
	getLocale,
	locales,
	setLocale as setParaglideLocale,
} from '@/paraglide/runtime';

type AvailableLocale = (typeof locales)[number];

interface LocaleState {
	locale: AvailableLocale;
	setLocale: (locale: AvailableLocale) => void;
}

export const useLocale = create<LocaleState>((set, get) => ({
	locale: getLocale(),
	setLocale: (locale: AvailableLocale) => {
		if (get().locale === locale) return;
		set({ locale });
		void setParaglideLocale(locale);
	},
}));
