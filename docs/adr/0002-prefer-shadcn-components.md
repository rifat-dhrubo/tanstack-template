# ADR 0002: Prefer shadcn/ui Components Over Custom Markup

## Status

Accepted

## Context

Feature components were accumulating custom-styled `div` and `span` elements for common UI patterns (badges, empty states, alerts, loading skeletons). This creates inconsistency with the design system, duplicates styling logic, and makes future theme updates harder.

The project already uses shadcn/ui as its component framework. The CLI provides `badge`, `empty`, `alert`, `skeleton`, and many other primitives that match the project's `radix-sera` preset (`b1oX6Imu`).

## Decision

**Prefer shadcn/ui components over custom markup for all generic UI patterns.**

When building feature components, check the shadcn registry first:

- Badges → `Badge`
- Empty states → `Empty` (`EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`)
- Error callouts → `Alert` (`AlertTitle`, `AlertDescription`, `AlertAction`)
- Loading placeholders → `Skeleton`
- Buttons → `Button`
- Separators → `Separator`
- Cards → `Card` family

Domain-specific layout helpers (e.g., a `MetaItem` that renders a label/value pair for lexicon results) may remain custom when no shadcn primitive directly covers the pattern. But the primitive elements inside them (badges, buttons, text styling) should still come from shadcn.

## Consequences

- Visual consistency: all badges, alerts, and empty states share the same design-system tokens.
- Less CSS duplication: border radius, spacing, and color tokens are centralized in shadcn primitives.
- Easier updates: running `pnpm dlx shadcn@latest add <component> --overwrite` pulls upstream fixes without manual CSS edits.
- Slightly more composition boilerplate: `Empty` requires `EmptyHeader` + `EmptyMedia` + `EmptyTitle` + `EmptyDescription` instead of a single `div`. This is acceptable because it enforces accessible structure.

## Examples

### Before (custom badge)

```tsx
<span className="inline-flex items-center rounded-none bg-primary/10 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-primary uppercase">
	{pos}
</span>
```

### After (shadcn Badge)

```tsx
<Badge className="bg-primary/10 text-primary">{pos}</Badge>
```

### Before (custom empty state)

```tsx
<div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
	<div className="text-6xl font-light text-muted-foreground/30">∅</div>
	<p className="text-lg font-medium text-foreground">
		কোনো ফলাফল পাওয়া যায়নি
	</p>
	<p className="max-w-md text-sm text-muted-foreground">...</p>
</div>
```

### After (shadcn Empty)

```tsx
<Empty className="py-24">
	<EmptyHeader>
		<EmptyMedia variant="icon">
			<SearchXIcon />
		</EmptyMedia>
		<EmptyTitle>কোনো ফলাফল পাওয়া যায়নি</EmptyTitle>
		<EmptyDescription>...</EmptyDescription>
	</EmptyHeader>
</Empty>
```

### Before (custom error state)

```tsx
<div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
	<div className="text-6xl font-light text-destructive/30">!</div>
	<p className="text-lg font-medium text-foreground">ত্রুটি ঘটেছে</p>
	<p className="max-w-md text-sm text-muted-foreground">...</p>
	<Button variant="outline" onClick={onRetry}>
		আবার চেষ্টা করুন
	</Button>
</div>
```

### After (shadcn Alert)

```tsx
<div className="flex items-center justify-center py-24">
	<Alert variant="destructive" className="max-w-md">
		<AlertCircleIcon />
		<AlertTitle>ত্রুটি ঘটেছে</AlertTitle>
		<AlertDescription>...</AlertDescription>
		<AlertAction>
			<Button variant="outline" size="xs" onClick={onRetry}>
				আবার চেষ্টা করুন
			</Button>
		</AlertAction>
	</Alert>
</div>
```
