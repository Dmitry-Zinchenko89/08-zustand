import type { Metadata } from 'next';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
    params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const tag = decodeURIComponent(slug.join('/'));

    return {
        title: `Notes tagged with "${tag}" – NoteHub`,
        description: `Список нотаток із тегом "${tag}" у застосунку NoteHub.`,
        openGraph: {
            title: `Notes tagged with "${tag}" – NoteHub`,
            description: `Список нотаток із тегом "${tag}" у застосунку NoteHub.`,
            url: `https://notehub-your-url.com/notes/filter/${tag}`,
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
    const { slug } = await params;

    const tag = decodeURIComponent(slug.join('/'));
    const page = 1;
    const search = '';

    const data = await fetchNotes({ page, search, tag });

    return <NotesClient tag={tag} initialData={data} />;
}
