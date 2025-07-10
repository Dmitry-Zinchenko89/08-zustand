'use client';

import Link from 'next/link';
import { useState } from 'react';
import css from './TagsMenu.module.css';

const TAGS = ['All', 'Work', 'Personal', 'Todo', 'Shopping', 'Meeting'];

export default function TagsMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className={css.menuContainer}>
            <button onClick={toggleMenu} className={css.menuButton}>
                Notes ▾
            </button>

            {isOpen && (
                <ul className={css.menuList}>
                    {TAGS.map(tag => (
                        <li key={tag} className={css.menuItem}>
                            <Link
                                href={`/notes/filter/${tag}`}
                                className={css.menuLink}
                                onClick={() => setIsOpen(false)}
                            >
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}