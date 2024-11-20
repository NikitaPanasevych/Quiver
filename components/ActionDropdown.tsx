'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import { Models } from 'node-appwrite';
import { actionsDropdownItems } from '@/constants';

const ActionDropdown = ({ file }: { file: Models.Document }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
				<DropdownMenuTrigger className=" shad-no-focus">
					<Image src="/assets/icons/dots.svg" alt="dots" width={35} height={35} />
				</DropdownMenuTrigger>
				<DropdownMenuContent className=" max-w-[200px] truncate">
					<DropdownMenuLabel>{file.name}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{actionsDropdownItems.map((actionItem) => (
						<DropdownMenuItem key={actionItem.value}>{actionItem.label}</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</Dialog>
	);
};

export default ActionDropdown;