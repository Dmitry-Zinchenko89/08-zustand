'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
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
    const [isLoading, setLoading] = useState(false);

    const draft = useNoteStore((state) => state.draft);
    const setDraft = useNoteStore((state) => state.setDraft);
    const clearDraft = useNoteStore((state) => state.clearDraft);

    useEffect(() => {

    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDraft({ [name]: value } as Partial<NewNote>);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createNote(draft);
            clearDraft();
            if (onSuccess) {
                onSuccess();
            } else {
                router.back();
            }
        } catch (error) {
            console.error('Failed to create note:', error);
        } finally {
            setLoading(false);
        }
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