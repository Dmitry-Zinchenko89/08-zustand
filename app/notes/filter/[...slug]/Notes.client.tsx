'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Link from 'next/link';

import css from './NotesPage.module.css';

type Props = {
    tag?: string;
    initialData: Awaited<ReturnType<typeof fetchNotes>>;
};

export default function NotesClient({ tag, initialData }: Props) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [debouncedQuery] = useDebounce(search, 500);

    const { data, isSuccess } = useQuery({
        queryKey: ['notes', debouncedQuery, page, tag],
        queryFn: () => fetchNotes({ page, search: debouncedQuery, tag }),
        initialData,
        placeholderData: initialData,
    });

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    return (
        <div className={css.app}>
            <div className={css.toolbar}>
                <SearchBox value={search} onChange={handleSearch} />
                {isSuccess && data.totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={data.totalPages}
                        onPageChange={setPage}
                    />
                )}

                <Link href="/notes/action/create" className={css.button}>
                    Створити нотатку +
                </Link>
            </div>

            {isSuccess && <NoteList items={data.notes} />}
        </div>
    );
}
