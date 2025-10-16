import React from 'react';
import { Logo } from '@/components/atoms/Logo';
import { InputSearch } from '@/components/atoms/InputSearch';
import { PageButton } from '@/components/atoms/PageButton';

export const Header: React.FC = () => {
    return (
        <header className="flex items-center w-full p-4 shadow mb-4">
            <span className="w-1/6 flex justify-center">
                <Logo />
            </span>
            <span className="w-3/6 flex justify-center">
                <InputSearch />
            </span>
            <span className="w-2/6 flex  flex-wrap justify-center gap-4">
                <PageButton page="home" />
                <PageButton page="favorites" />
            </span>
        </header>
    );
};
