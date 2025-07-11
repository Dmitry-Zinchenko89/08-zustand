import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import css from './Home.module.css';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

type ChildrenType = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub — простий додаток для створення, пошуку та зберігання нотаток.',
  openGraph: {
    title: 'NoteHub',
    description: 'NoteHub — простий додаток для створення, пошуку та зберігання нотаток.',
    url: 'https://notehub-your-url.com',
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

export default function RootLayout({ children, modal }: ChildrenType) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          <main className={css.main}>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}