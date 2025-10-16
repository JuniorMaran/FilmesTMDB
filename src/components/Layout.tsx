import React from 'react';
import { Header } from '@/components/organisms/Header';
// import { MoviesProvider } from '@/contexts/MoviesContext';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        // <MoviesProvider>
        <div>
            <Header />
            <main>{children}</main>
        </div>
        // </MoviesProvider>
    );
}
