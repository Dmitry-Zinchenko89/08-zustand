import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreview from './NotePreview.client';

type Props = {
    params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
    const { id } = await params;
    const parsedId = Number(id);

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', parsedId],
        queryFn: () => fetchNoteById(parsedId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreview id={parsedId} />
        </HydrationBoundary>
    );
}