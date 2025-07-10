'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';
import { format, parseISO } from 'date-fns';
import css from './NoteList.module.css';

interface NoteListProps {
    items: Note[];
}

export default function NoteList({ items }: NoteListProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this note?')) {
            deleteMutation.mutate(id);
        }
    };

    const goToDetails = (id: number) => {
        router.push(`/notes/${id}`, { scroll: false });
    };

    return (
        <ul className={css.list}>
            {items.map((note) => (
                <li key={note.id} className={css.item}>
                    <div onClick={() => goToDetails(note.id)} className={css.clickable}>
                        <h3>{note.title}</h3>
                        <p>#{note.tag}</p>
                        <p className={css.date}>
                            {format(parseISO(note.createdAt), 'dd MMM yyyy')}
                        </p>
                    </div>
                    <button
                        onClick={() => handleDelete(note.id)}
                        className={css.deleteBtn}
                        disabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </button>
                </li>
            ))}
        </ul>
    );
}