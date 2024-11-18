'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

import React, { useState } from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { createAccount } from '@/lib/actions/user.actions';
import OTPmodal from './OTPmodal';

const formSchema = z.object({
	username: z.string().min(2).max(50),
});

type FormType = 'sign-in' | 'sign-up';

const AuthFormSchema = (formType: string) => {
	return z.object({
		email: z.string().email(),
		fullName: formType === 'sign-up' ? z.string().min(2).max(50) : z.string().optional(),
	});
};

const AuthForm = ({ type }: { type: FormType }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [accountId, setAccountId] = useState(null);

	const formSchema = AuthFormSchema(type);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			email: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		setErrorMessage('');

		try {
			const user = await createAccount({
				fullName: values.fullName || '',
				email: values.email,
			});
			setAccountId(user.accountId);
		} catch {
			setErrorMessage('Failed to create account');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className=" auth-form">
					<h1 className=" form-title">{type === 'sign-in' ? 'Sign In' : 'Sign Up'}</h1>
					{type === 'sign-up' ? (
						<>
							<FormField
								control={form.control}
								name="fullName"
								render={({ field }) => (
									<FormItem>
										<div className=" shad-form-item">
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input className=" shad-input" placeholder="Enter your full name" {...field} />
											</FormControl>
										</div>
										<FormMessage className=" shad-form-message" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<div className=" shad-form-item">
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input className=" shad-input" placeholder="Enter your email" {...field} />
											</FormControl>
										</div>
										<FormMessage className=" shad-form-message" />
									</FormItem>
								)}
							/>
						</>
					) : (
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<div className=" shad-form-item">
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input className=" shad-input" placeholder="Enter your email" {...field} />
										</FormControl>
									</div>
									<FormMessage className=" shad-form-message" />
								</FormItem>
							)}
						/>
					)}
					<Button disabled={isLoading} className=" form-submit-button" type="submit">
						{type === 'sign-in' ? 'Sign In' : 'Sign Up'}
						{isLoading && (
							<Image
								className=" m-2 animate-spin"
								src="assets/icons/loader.svg"
								alt="loading"
								width={24}
								height={24}
							/>
						)}
					</Button>
					{errorMessage && <p className=" error-message">{errorMessage}</p>}
					<div className=" body-2 flex justify-center">
						<p className=" text-light-100">
							{type === 'sign-in' ? 'Don’t have an account?' : 'Already have an account?'}
						</p>
						<Link className=" ml-1 font-medium text-brand" href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
							{type === 'sign-in' ? 'Sign Up' : 'Sign In'}
						</Link>
					</div>
				</form>
			</Form>
			{accountId && <OTPmodal email={form.getValues('email')} accountId={accountId} />}
		</>
	);
};

export default AuthForm;
