import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { z } from 'zod';

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
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { signUpSchema } from '@/features/auth/sign-up/schemas';
import * as m from '@/paraglide/messages';

function SignUpForm() {
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validators: {
			onChange: signUpSchema,
		},
		onSubmit: async (data) => {
			setIsSubmitting(true);
			try {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				console.log('Sign up:', data.value);
			} finally {
				setIsSubmitting(false);
			}
		},
	});

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader>
					<CardTitle>{m.auth_sign_up_title()}</CardTitle>
					<CardDescription>{m.auth_sign_up_description()}</CardDescription>
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
							<form.Field
								name="name"
								validators={{
									onChange: z.string().min(1, m.validation_name_required()),
								}}
							>
								{(field) => {
									const errors = field.state.meta.errors;
									return (
										<Field data-invalid={errors.length > 0}>
											<FieldLabel htmlFor={field.name}>
												{m.auth_name_label()}
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												type="text"
												placeholder={m.auth_name_placeholder()}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												aria-invalid={errors.length > 0}
												required
											/>
											<FieldError
												errors={errors.map((e) => ({
													message: e?.message ?? '',
												}))}
											/>
										</Field>
									);
								}}
							</form.Field>
							<form.Field
								name="email"
								validators={{
									onChange: z.string().email(m.validation_invalid_email()),
								}}
							>
								{(field) => {
									const errors = field.state.meta.errors;
									return (
										<Field data-invalid={errors.length > 0}>
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
												aria-invalid={errors.length > 0}
												required
											/>
											<FieldError
												errors={errors.map((e) => ({
													message: e?.message ?? '',
												}))}
											/>
										</Field>
									);
								}}
							</form.Field>
							<form.Field
								name="password"
								validators={{
									onChange: z
										.string()
										.min(8, m.validation_password_min_length()),
								}}
							>
								{(field) => {
									const errors = field.state.meta.errors;
									return (
										<Field data-invalid={errors.length > 0}>
											<FieldLabel htmlFor={field.name}>
												{m.auth_password_label()}
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												type="password"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												aria-invalid={errors.length > 0}
												required
											/>
											<FieldError
												errors={errors.map((e) => ({
													message: e?.message ?? '',
												}))}
											/>
										</Field>
									);
								}}
							</form.Field>
							<form.Field
								name="confirmPassword"
								validators={{
									onChange: z
										.string()
										.min(1, m.validation_confirm_password_required()),
								}}
							>
								{(field) => {
									const errors = field.state.meta.errors;
									return (
										<Field data-invalid={errors.length > 0}>
											<FieldLabel htmlFor={field.name}>
												{m.auth_confirm_password_label()}
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												type="password"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												aria-invalid={errors.length > 0}
												required
											/>
											<FieldError
												errors={errors.map((e) => ({
													message: e?.message ?? '',
												}))}
											/>
										</Field>
									);
								}}
							</form.Field>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? (
									<LoaderCircle className="animate-spin" aria-hidden="true" />
								) : null}
								{m.auth_sign_up_button()}
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<div className="text-center text-sm text-muted-foreground">
				{m.auth_has_account()}{' '}
				<Link
					to="/sign-in"
					className="underline underline-offset-4 hover:text-primary"
				>
					{m.auth_sign_in_link()}
				</Link>
			</div>
		</div>
	);
}

export { SignUpForm };
