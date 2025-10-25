import React from 'react';
import { Link } from 'react-router-dom';

interface PageButtonProps {
    page: string;
    customPath?: string;
}

interface PageConfigType {
    [key: string]: {
        name: string;
        path: string;
    };
}
const pageConfig: PageConfigType = {
    home: { name: 'Home', path: '/' },
    favorites: { name: 'Favoritos', path: '/favorites' },
    explorer: { name: 'Explorar Filmes', path: '/' },
};

export const PageButton: React.FC<PageButtonProps> = ({ page, customPath }) => {
    const { name: pageName, path } = pageConfig[page] || { name: page, path: '/not-found' };
    const finalPath = customPath || path;

    return (
        <Link to={finalPath}>
            <span className="btn-primary">{pageName}</span>
        </Link>
    );
};
