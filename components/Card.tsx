import Link from 'next/link';
import { Models } from 'node-appwrite';
import React from 'react';
import Thumbnail from './Thumbnail';
import { convertFileSize } from '@/lib/utils';
import FormatedDateTime from './FormatedDateTime';
import ActionDropdown from './ActionDropdown';

const Card = ({ file }: { file: Models.Document }) => {
	return (
		<Link href={file.url} target="_blank" className=" file-card">
			<div className=" flex justify-between">
				<Thumbnail type={file.type} extension={file.extension} url={file.url} />
				<div className="">
					<ActionDropdown file={file} />
					<p className=" body-1">{convertFileSize(file.size)}</p>
				</div>
			</div>

			<div className=" file-card-details">
				<p className=" subtittle-2 line-clamp-1">{file.name}</p>
				<FormatedDateTime date={file.$createdAt} className=" body-2 text-light-100" />
				<p className=" caption line-clamp-1 text-light-200">{file.owner.fullName}</p>
			</div>
		</Link>
	);
};

export default Card;
