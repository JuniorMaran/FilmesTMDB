import React from 'react';
import { MdImageNotSupported } from 'react-icons/md';

import { tmdbService } from '@/services/tmdbService';
interface BoxImageProps {
    moviePosterPath: string;
    size: 'w300' | 'original';
}

 
export const BoxImage: React.FC <BoxImageProps> = ({ moviePosterPath, size }) => {

    if (!moviePosterPath) {
        return (
            <div className="w-full bg-gray-700 rounded-md flex items-center justify-center" style={{ aspectRatio: '2/3' }}>
                <div className="flex flex-col items-center justify-center">
                    <MdImageNotSupported className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-400 text-sm text-center px-2">Imagem não disponível</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden rounded-md" style={{ aspectRatio: '2/3' }}>
            <img
                src={tmdbService.getImagePath(moviePosterPath, size) || undefined}
                alt="Poster do filme"
                className="w-full h-full object-cover"
            />
        </div>
    );
};