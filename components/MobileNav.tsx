'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Separator } from './ui/separator';
import { navItems } from '@/constants';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { signOutUser } from '@/lib/actions/user.actions';
import FileUploader from './FileUploader';

interface Props {
	$id: string;
	accountId: string;
	fullName: string;
	email: string;
	avatar: string;
}

const MobileNav = ({ $id: ownerId, accountId, fullName, email, avatar }: Props) => {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	return (
		<header className=" mobile-header">
			<Image src="/assets/icons/logo-full-brand.svg" alt="logo" width={120} height={50} className=" h-auto" />
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger>
					<Image src="/assets/icons/menu.svg" alt="Search" width={30} height={30} className=" h-auto" />
				</SheetTrigger>
				<SheetContent className=" shad-sheet h-screen px-3">
					<SheetTitle>
						<div className=" header-user">
							<Image src={avatar} alt="avatar" width={45} height={45} className=" header-user-avatar" />
							<div className=" sm:hidden lg:block">
								<p className=" subtitle-2 capitalize">{fullName}</p>
								<p className=" caption">{email}</p>
							</div>
						</div>
						<Separator className=" mb-4 bg-light-200/20" />
					</SheetTitle>
					<nav className=" mobile-nav">
						<ul className=" mobile-nav-list">
							{navItems.map(({ url, name, icon }) => (
								<Link key={name} href={url} className=" lg:w-full">
									<li className={cn('mobile-nav-item', pathname === url && 'shad-active')}>
										<Image
											className={cn('nav-icon', pathname === url && 'nav-icon-active')}
											src={icon}
											alt={name}
											width={24}
											height={24}
										/>
										<p className="">{name}</p>
									</li>
								</Link>
							))}
						</ul>
					</nav>
					<Separator className=" my-5 bg-light-200/20" />
					<div className=" flex flex-col gap-5 pb-5 justify-between">
						<FileUploader ownerId={ownerId} accountId={accountId} />
						<Button
							className=" mobile-sign-out-button"
							type="submit"
							onClick={async () => {
								await signOutUser();
							}}
						>
							<Image src="/assets/icons/logout.svg" alt="logout" width={24} height={24} className=" w-6" />
							Logout
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</header>
	);
};

export default MobileNav;