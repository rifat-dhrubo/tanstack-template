# ADR 0003: Use TanStack Form Schemas With shadcn Field Primitives

## Status

Accepted

## Context

Auth forms use TanStack Form for form state, Zod for validation, and shadcn/ui `Field` primitives for accessible field markup. It is easy for feature forms to drift by defining one Zod schema for submit-level validation while also duplicating field-level validators inline, or by replacing shadcn field slots with custom layout markup.

That drift makes validation harder to maintain, creates inconsistent error timing, and weakens the accessibility contract provided by the shadcn field components.

## Decision

Feature forms should follow the shadcn TanStack Form pattern:

- Define the form's Zod schema in the feature's schema module.
- Pass that schema to `useForm` through the form-level `validators` option.
- Do not duplicate schema rules in per-field `validators` unless a field has behavior that is truly separate from the form schema.
- Render each control with `form.Field` and the shadcn `Field` family.
- Derive invalid state with `field.state.meta.isTouched && !field.state.meta.isValid`.
- Put `data-invalid={isInvalid}` on `Field`.
- Put `aria-invalid={isInvalid}` on the input/control.
- Render `FieldError` only when invalid, passing `field.state.meta.errors` directly.
- Use `FieldContent` for label/description/error grouping or aligned field metadata instead of ad hoc wrapper `div`s.
- Use Sonner for async submit feedback. Mount the shadcn `Toaster` once at the app shell, import `toast` from `sonner` in feature code, and wrap submit promises with `toast.promise`.
- Prefer promise chaining with `.then()` and `.finally()` for submit stubs and simple async flows that only need loading/success/error feedback. Do not wrap those flows in local `try`/`catch` blocks just to manage toast states.

Example:

```tsx
const form = useForm({
	defaultValues: {
		email: '',
		password: '',
	},
	validators: {
		onChange: signInSchema,
	},
	onSubmit: async ({ value }) => {
		// submit value
	},
});

<form.Field name="email">
	{(field) => {
		const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

		return (
			<Field data-invalid={isInvalid}>
				<FieldLabel htmlFor={field.name}>Email</FieldLabel>
				<Input
					id={field.name}
					name={field.name}
					type="email"
					value={field.state.value}
					onBlur={field.handleBlur}
					onChange={(event) => field.handleChange(event.target.value)}
					aria-invalid={isInvalid}
				/>
				{isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
			</Field>
		);
	}}
</form.Field>;

const submit = saveSettings(value).finally(() => {
	setIsSubmitting(false);
});

const submitToast = toast.promise(submit, {
	loading: 'Saving...',
	success: 'Saved',
	error: 'Unable to save',
});

await submitToast.unwrap();
```

## Consequences

- Schema modules remain the source of truth for validation messages and shape.
- Form fields match shadcn's documented TanStack Form accessibility pattern.
- Error rendering stays consistent across auth and future feature forms.
- Submit feedback is consistent across feature forms and uses the shared shadcn Sonner setup.
- Field-level validators remain available for exceptional per-control behavior, but they should not repeat the shared schema.
