import axios from 'axios';
import type { Note, NewNote } from '../types/note';
import { ResponseGetData } from '@/types/ResponseGetData';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
const notehubToken = process.env.NEXT_PUBLIC_TOKEN;

const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${notehubToken}`,
};

interface FetchNotesParams {
    search?: string;
    page?: number;
    tag?: string;
}

export async function fetchNotes({
    search = '',
    page = 1,
    tag,
}: FetchNotesParams): Promise<ResponseGetData> {
    const params: Record<string, string | number> = {
        page,
        perPage: 16,
    };

    if (search) params.search = search;
    if (tag && tag !== 'All') params.tag = tag;

    const { data } = await axios.get<ResponseGetData>('/notes', {
        params,
        headers,
    });

    return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
    const { data } = await axios.post<Note>('/notes', newNote, { headers });
    return data;
}

export async function deleteNote(noteId: number): Promise<Note> {
    const { data } = await axios.delete<Note>(`/notes/${noteId}`, { headers });
    return data;
}

export async function fetchNoteById(noteId: number): Promise<Note> {
    const { data } = await axios.get<Note>(`/notes/${noteId}`, { headers });
    return data;
}