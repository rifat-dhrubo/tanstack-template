import { create } from 'zustand';

import {
	availableLanguageTags,
	languageTag,
	onSetLanguageTag,
	setLanguageTag,
} from '@/paraglide/runtime';

type AvailableLanguageTag = (typeof availableLanguageTags)[number];

interface LocaleState {
	locale: AvailableLanguageTag;
	setLocale: (locale: AvailableLanguageTag) => void;
}

export const useLocale = create<LocaleState>((set, get) => ({
	locale: languageTag(),
	setLocale: (locale: AvailableLanguageTag) => {
		if (get().locale === locale) return;
		set({ locale });
		setLanguageTag(locale);
	},
}));

// Register once globally to keep the store in sync with paraglide runtime.
// This covers server-side locale resolution (setLanguageTag via SSR middleware)
// and any direct setLanguageTag calls outside the store.
onSetLanguageTag((tag) => {
	if (useLocale.getState().locale !== tag) {
		useLocale.setState({ locale: tag });
	}
});
