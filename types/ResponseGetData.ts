import { Note } from './note';

export interface ResponseGetData {
    notes: Note[];
    totalPages: number;
}
export async function fetchNotes({
    search = '',
    page = 1,
    tag,
}: {
    search?: string;
    page?: number;
    tag?: string;
}): Promise<{ notes: Note[]; total: number }> {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (page) params.set('page', page.toString());
    if (tag) params.set('tag', tag);

    const res = await fetch(`/api/notes?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch notes');
    return res.json();
}