import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo.png';

export const Logo: React.FC = () => {
    return (
        <div>
            <Link to="/">
                <img src={logo} className="w-[100px]" alt="TMDB Logo" />
            </Link>
        </div>
    );
};
