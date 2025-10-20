import React from 'react';

import { tmdbService } from '@/services/tmdbService';
interface AvatarProps {
    avatar: string;
}

export const Avatar: React.FC<AvatarProps>= ({ avatar }) => {
    return (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <img src={tmdbService.getImagePath(avatar, 'w300')} alt="Avatar" className="w-full h-full object-cover rounded-full" />
        </div>
    );
};
