'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

type Props = {
    id: number;
};

export default function NoteDetails({ id }: Props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Error loading note</p>;

    return (
        <article className={css.note}>
            <h2 className={css.title}>{data.title}</h2>
            <p className={css.content}>{data.content}</p>
            <p className={css.tag}>#{data.tag}</p>
        </article>
    );
}