'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NewNote } from '@/types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
    onSuccess?: () => void;
    onClose?: () => void;
}

export default function NoteForm({ onSuccess }: NoteFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const draft = useNoteStore((state) => state.draft);
    const setDraft = useNoteStore((state) => state.setDraft);
    const clearDraft = useNoteStore((state) => state.clearDraft);

    const [isLoading, setIsLoading] = useState(false);

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            clearDraft();
            if (onSuccess) {
                onSuccess();
            } else {
                router.back();
            }
        },
        onError: (error) => {
            console.error('Failed to create note:', error);
        },
        onSettled: () => {
            setIsLoading(false);
        },
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setDraft({ [name]: value } as Partial<NewNote>);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        mutation.mutate(draft);
    };

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor="title" className={css.label}>Title:</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    className={css.input}
                    value={draft.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content" className={css.label}>Content:</label>
                <textarea
                    id="content"
                    name="content"
                    className={css.textarea}
                    value={draft.content}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag" className={css.label}>Tag:</label>
                <select
                    id="tag"
                    name="tag"
                    className={css.select}
                    value={draft.tag}
                    onChange={handleChange}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
                <button
                    type="button"
                    className={css.cancelButton}
                    onClick={() => router.back()}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={isLoading}
                >
                    Create note
                </button>
            </div>
        </form>
    );
}
