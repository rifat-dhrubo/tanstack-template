import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { signInSchema } from '@/features/auth/sign-in/schemas';
import * as m from '@/paraglide/messages';

function SignInForm() {
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		validators: {
			onChange: signInSchema,
		},
		onSubmit: async (data) => {
			setIsSubmitting(true);
			const signIn = new Promise<void>((resolve) => {
				setTimeout(resolve, 1000);
			})
				.then(() => {
					console.log('Sign in:', data.value);
				})
				.finally(() => {
					setIsSubmitting(false);
				});

			const signInToast = toast.promise(signIn, {
				loading: m.auth_sign_in_toast_loading(),
				success: m.auth_sign_in_toast_success(),
				error: m.auth_sign_in_toast_error(),
			});
			await signInToast.unwrap();
		},
	});

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader>
					<CardTitle>{m.auth_sign_in_title()}</CardTitle>
					<CardDescription>{m.auth_sign_in_description()}</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							void form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.Field name="email">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>
												{m.auth_email_label()}
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												type="email"
												placeholder={m.auth_email_placeholder()}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												aria-invalid={isInvalid}
												required
											/>
											{isInvalid ? (
												<FieldError errors={field.state.meta.errors} />
											) : null}
										</Field>
									);
								}}
							</form.Field>
							<form.Field name="password">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldContent className="flex-row items-center justify-between">
												<FieldLabel htmlFor={field.name}>
													{m.auth_password_label()}
												</FieldLabel>
												<button
													type="button"
													className="text-sm underline-offset-4 hover:underline"
												>
													{m.auth_forgot_password()}
												</button>
											</FieldContent>
											<Input
												id={field.name}
												name={field.name}
												type="password"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												aria-invalid={isInvalid}
												required
											/>
											{isInvalid ? (
												<FieldError errors={field.state.meta.errors} />
											) : null}
										</Field>
									);
								}}
							</form.Field>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? (
									<LoaderCircle className="animate-spin" aria-hidden="true" />
								) : null}
								{m.auth_sign_in_button()}
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<div className="text-center text-sm text-muted-foreground">
				{m.auth_no_account()}{' '}
				<Link
					to="/sign-up"
					className="underline underline-offset-4 hover:text-primary"
				>
					{m.auth_sign_up_link()}
				</Link>
			</div>
		</div>
	);
}

export { SignInForm };
