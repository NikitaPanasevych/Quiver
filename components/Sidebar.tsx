'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { avatarPlaceholderUrl, navItems } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Props {
	fullName: string;
	email: string;
	avatar: string;
}

const Sidebar = ({ fullName, email, avatar }: Props) => {
	const pathName = usePathname();

	return (
		<aside className=" sidebar">
			<Link href="/">
				<Image
					src="/assets/icons/logo-full-brand.svg"
					alt="logo"
					width={160}
					height={50}
					className=" hidden h-auto lg:block"
				/>

				<Image src="/assets/icons/logo-brand.svg" alt="logo" width={52} height={52} className=" lg:hidden" />
			</Link>
			<nav className=" sidebar-nav">
				<ul className=" flex flex-1 flex-col gap-6">
					{navItems.map(({ url, name, icon }) => (
						<Link key={name} href={url} className="lg:w-full">
							<li className={cn('sidebar-nav-item', pathName === url && 'shad-active')}>
								<Image
									className={cn('nav-icon', pathName === url && 'nav-icon-active')}
									src={icon}
									alt={name}
									width={24}
									height={24}
								/>
								<p className=" hidden lg:block">{name}</p>
							</li>
						</Link>
					))}
				</ul>
			</nav>
			<Image src="/assets/images/files-2.png" alt="logo" width={500} height={420} className=" w-full" />
			<div className=" sidebar-user-info">
				<Image src={avatarPlaceholderUrl} alt="avatar" width={40} height={40} className=" sidebar-user-avatar" />
				<div className=" hidden lg:block">
					<p className=" subtitle capitilize">{fullName}</p>
					<p className=" caption">{email}</p>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
