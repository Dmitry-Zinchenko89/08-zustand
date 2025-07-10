'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import css from '../[id]/NotePreview.module.css';
import { format } from 'date-fns';

type Props = {
    id: number;
};

export default function NotePreview({ id }: Props) {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    const handleClose = () => {
        router.back();
    };

    if (isLoading) {
        return (
            <Modal onClose={handleClose}>
                <p className={css.message}>Loading...</p>
            </Modal>
        );
    }

    if (isError || !data) {
        return (
            <Modal onClose={handleClose}>
                <p className={css.message}>Error loading note</p>
            </Modal>
        );
    }

    return (
        <Modal onClose={handleClose}>
            <div className={css.note}>
                <h2 className={css.title}>{data.title}</h2>
                <p className={css.content}>{data.content}</p>
                <p className={css.tag}>#{data.tag}</p>
                <p className={css.date}>
                    Created: {format(new Date(data.createdAt), 'dd MMM yyyy, HH:mm')}
                </p>
            </div>
        </Modal>
    );
}