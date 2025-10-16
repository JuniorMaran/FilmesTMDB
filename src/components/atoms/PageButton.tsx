import React from 'react';
import { Link } from 'react-router-dom';

interface PageButtonProps {
    page: string;
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
};

export const PageButton: React.FC<PageButtonProps> = ({ page }) => {
    const { name: pageName, path } = pageConfig[page] || { name: page, path: '/not-found' };

    return (
        <div className="flex">
            <Link to={path}>
                <button className="btn-primary">
                    {pageName}
                </button>
            </Link>
        </div>
    );
};
