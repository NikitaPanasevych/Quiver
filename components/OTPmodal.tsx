'use client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';
import { sendEmailOTP, verifySecret } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import { set } from 'react-hook-form';

const OTPmodal = ({ email, accountId }: { email: string; accountId: string }) => {
	const [isOpen, setIsOpen] = useState(true);
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		setError('');
		event.preventDefault();
		setIsLoading(true);
		try {
			const sessionId = await verifySecret({ accountId, password });
			if (sessionId) {
				router.push('/');
			}
		} catch (error) {
			setError('Invalid code');
		} finally {
			setIsLoading(false);
		}
	};

	const handleResendOTP = async () => {
		try {
			await sendEmailOTP({ email });
		} catch (error) {
			console.log('Error Resend OTP', error);
		}
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent className=" shad-alert-dialog">
				<AlertDialogHeader className=" relative flex justify-center">
					<AlertDialogTitle className=" h2 text-center">
						Enter your OTP
						<Image
							src="/assets/icons/close-dark.svg"
							alt="close"
							width={20}
							height={20}
							onClick={() => setIsOpen(false)}
							className=" otp-close-button"
						/>
					</AlertDialogTitle>
					<AlertDialogDescription className=" subtitle-2 text-center text-light-100">
						Enter the OTP sent to <span className=" pl-1 text-brand">{email}</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<InputOTP maxLength={6} value={password} onChange={setPassword}>
					<InputOTPGroup className=" shad-otp">
						<InputOTPSlot index={0} className=" shad-otp-slot" />
						<InputOTPSlot index={1} className=" shad-otp-slot" />
						<InputOTPSlot index={2} className=" shad-otp-slot" />
						<InputOTPSlot index={3} className=" shad-otp-slot" />
						<InputOTPSlot index={4} className=" shad-otp-slot" />
						<InputOTPSlot index={5} className=" shad-otp-slot" />
					</InputOTPGroup>
				</InputOTP>
				<div className=" flex w-full flex-col gap-4">
					<AlertDialogAction
						disabled={isLoading}
						onClick={handleSubmit}
						type="button"
						className=" shad-submit-btn h-12"
					>
						Submit
						{isLoading && (
							<Image
								className=" ml-2 animate-spin"
								src="/assets/icons/loader.svg"
								alt="loader"
								width={24}
								height={24}
							/>
						)}
					</AlertDialogAction>
					<div>{error !== '' && <p className=" error-message">{error}</p>}</div>
					<div className=" text-center subtitle-2 mt-2 text-light-100">
						Didn't get a code?
						<Button variant="link" onClick={handleResendOTP} className=" pl-1 text-brand">
							Resend OTP
						</Button>
					</div>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default OTPmodal;
