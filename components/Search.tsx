'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getFiles } from '@/lib/actions/file.actions';
import { Models } from 'node-appwrite';
import Thumbnail from './Thumbnail';
import FormatedDateTime from './FormatedDateTime';
import { useDebounce } from 'use-debounce';

const Search = () => {
	const [query, setQuery] = useState('');
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get('q') || '';
	const [results, setResults] = useState<Models.Document[]>([]);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const path = usePathname();
	const [debouncedQuery] = useDebounce(query, 300);

	useEffect(() => {
		const fetchFiles = async () => {
			if (debouncedQuery.length === 0) {
				setResults([]);
				setOpen(false);
				return router.push(path.replace(searchParams.toString(), ''));
			}

			const files = await getFiles({ types: [], searchText: debouncedQuery });
			setResults(files.documents);
			setOpen(true);
		};

		fetchFiles();
	}, [debouncedQuery]);

	useEffect(() => {
		if (!searchQuery) {
			setQuery('');
		}
	}, [searchQuery]);

	const handleClickItem = (file: Models.Document) => {
		setOpen(false);
		setResults([]);

		router.push(`${file.type === 'video' || file.type === 'audio' ? 'media' : file.type + 's'}?q=${query}`);
	};

	return (
		<div className=" search">
			<div className=" search-input-wrapper">
				<Image src="/assets/icons/search.svg" alt="search" width={24} height={24} />
				<Input
					value={query}
					placeholder="Search..."
					className=" search-input"
					onChange={(e) => setQuery(e.target.value)}
				/>
				{open && (
					<ul className=" search-result">
						{results.length > 0 ? (
							results.map((file) => (
								<li
									onClickCapture={() => handleClickItem(file)}
									className=" flex items-center justify-between"
									key={file.$id}
								>
									<div className=" flex cursor-pointer items-center gap-4">
										<Thumbnail
											type={file.type}
											url={file.url}
											extension={file.extension}
											className=" size-9 min-w-9"
										/>

										<p className=" subtitle-2 line-clamp-1 text-light-100">{file.name}</p>
									</div>
									<FormatedDateTime date={file.$createdAt} className=" caption line-clamp-1 text-light-200" />
								</li>
							))
						) : (
							<p className=" empty-result">No results found</p>
						)}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Search;
