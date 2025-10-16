import React from 'react';

import { tmdbService } from '@/services/tmdbService';
interface BoxImageProps {
    moviePosterPath: string;
    size: 'w300' | 'original';
}

 
export const BoxImage: React.FC <BoxImageProps> = ({ moviePosterPath, size }) => {

    return (
        <div>
            <img src={tmdbService.getImagePath(moviePosterPath, size)} alt="Poster do filme" />
        </div>
    );
};