import Link from 'next/link';
import css from './Sidebar.module.css';

const TAGS = ['All', 'Work', 'Personal', 'Todo', 'Shopping', 'Meeting'];

export default function Sidebar() {
    return (
        <ul className={css.menuList}>
            {TAGS.map(tag => (
                <li key={tag} className={css.menuItem}>
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
