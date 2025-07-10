import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const note = await fetchNoteById(Number(id));

    return {
        title: `${note.title} | NoteHub`,
        description: note.content.slice(0, 100),
        openGraph: {
            title: `${note.title} | NoteHub`,
            description: note.content.slice(0, 100),
            url: `https://notehub-your-url.com/notes/${note.id}`,
            images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
        },
    };
}



export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <NoteDetails id={Number(id)} />;
}
