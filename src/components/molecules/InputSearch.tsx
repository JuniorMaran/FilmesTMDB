import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '@/contexts/SearchContext';

export const InputSearch: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const { setSearchTerm } = useSearch();
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (inputValue.trim()) {
            setSearchTerm(inputValue);
            navigate('/search');
        }
    };

    return (
        <form onSubmit={handleSearch} className="w-full">
            <input
                className="p-2 w-full"
                placeholder="Buscar filme..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </form>
    );
};
