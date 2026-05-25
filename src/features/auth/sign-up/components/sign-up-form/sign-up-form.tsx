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
					<CardTitle>Create an account</CardTitle>
					<CardDescription>
						Enter your details below to create your account
					</CardDescription>
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
									onChange: z.string().min(1, 'Name is required'),
								}}
							>
								{(field) => {
									const errors = field.state.meta.errors;
									return (
										<Field data-invalid={errors.length > 0}>
											<FieldLabel htmlFor={field.name}>Name</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												type="text"
												placeholder="John Doe"
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
									onChange: z
										.string()
										.email('Please enter a valid email address'),
								}}
							>
								{(field) => {
									const errors = field.state.meta.errors;
									return (
										<Field data-invalid={errors.length > 0}>
											<FieldLabel htmlFor={field.name}>Email</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												type="email"
												placeholder="m@example.com"
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
										.min(8, 'Password must be at least 8 characters'),
								}}
							>
								{(field) => {
									const errors = field.state.meta.errors;
									return (
										<Field data-invalid={errors.length > 0}>
											<FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
									onChange: z.string().min(1, 'Please confirm your password'),
								}}
							>
								{(field) => {
									const errors = field.state.meta.errors;
									return (
										<Field data-invalid={errors.length > 0}>
											<FieldLabel htmlFor={field.name}>
												Confirm Password
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
								Create Account
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<div className="text-center text-sm text-muted-foreground">
				Already have an account?{' '}
				<Link
					to="/sign-in"
					className="underline underline-offset-4 hover:text-primary"
				>
					Sign in
				</Link>
			</div>
		</div>
	);
}

export { SignUpForm };
