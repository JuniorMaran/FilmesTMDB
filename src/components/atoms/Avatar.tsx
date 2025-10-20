
import React from 'react';

import { tmdbService } from '@/services/tmdbService';

interface AvatarProps {
    image: string;
}

export const Avatar: React.FC<AvatarProps> = ({image}) => {
    return (
        <div className="w-10 h-10 bg-gray-300 rounded-full">
            <img src={tmdbService.getImagePath(image, 'w300')} alt="Avatar" className="w-full h-full object-cover rounded-full" />
        </div>
    );
};

