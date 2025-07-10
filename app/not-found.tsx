import css from './Home.module.css';

export const metadata = {
    title: 'Page not found – NoteHub',
    description: 'Сторінку не знайдено. Схоже, вона не існує.',
    openGraph: {
        title: 'Page not found – NoteHub',
        description: 'Сторінку не знайдено. Схоже, вона не існує.',
        url: 'https://notehub-your-url.com/404',
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
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