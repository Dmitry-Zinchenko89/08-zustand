import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client';
import type { Metadata } from 'next';

type Props = {
    params: Promise<{ id: string }>;
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const note = await fetchNoteById(Number((await params).id));

    return {
        title: `${note.title} | NoteHub`,
        description: note.content.slice(0, 100),
        openGraph: {
            title: `${note.title} | NoteHub`,
            description: note.content.slice(0, 100),
            url: `https://notehub-your-url.com/notes/${note.id}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'NoteHub preview image',
                },
            ],
        },
    };
}

export default async function Page({ params }: Props) {
    const id = Number((await params).id);
    return <NoteDetails id={id} />;
}