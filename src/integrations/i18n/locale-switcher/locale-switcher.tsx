import { Languages } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocale } from '@/integrations/i18n/locale-store';
import { $locale } from '@/paraglide/messages';
import { availableLanguageTags } from '@/paraglide/runtime';

type AvailableLanguageTag = (typeof availableLanguageTags)[number];

export function LocaleSwitcher() {
	const locale = useLocale((state) => state.locale);
	const setLocale = useLocale((state) => state.setLocale);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm">
					<Languages className="size-4" />
					<span>{$locale()}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup
					value={locale}
					onValueChange={(value) => setLocale(value as AvailableLanguageTag)}
				>
					{availableLanguageTags.map((tag) => (
						<DropdownMenuRadioItem
							key={tag}
							value={tag}
							disabled={tag === locale}
						>
							{$locale({}, { languageTag: tag })}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
