import css from './Home.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Page not found – NoteHub',
    description: 'Сторінку не знайдено. Схоже, вона не існує.',
    openGraph: {
        title: 'Page not found – NoteHub',
        description: 'Сторінку не знайдено. Схоже, вона не існує.',
        url: 'https://notehub-your-url.com/404',
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

export default function NotFound() {
    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>
                Sorry, the page you are looking for does not exist.
            </p>
        </>
    );
}