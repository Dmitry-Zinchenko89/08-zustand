import { ChangeEvent } from 'react';

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder="Search notes..."
            className="border px-4 py-2 rounded w-full"
        />
    );
}
