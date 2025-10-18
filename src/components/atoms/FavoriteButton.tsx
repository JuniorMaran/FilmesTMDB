import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

interface FavoriteButtonProps {
    favorite: boolean;
    large?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ favorite, large }) => {
    const getContainerClasses = () => {
        if (!large) return 'rounded-full';
        return favorite
            ? 'bg-red-500 border border-red-500 text-white rounded-lg p-2'
            : 'border border-[var(--primary-color)] rounded-lg p-2 hover:bg-red-50 transition-colors';
    };

    const getIconColor = () => {
        if (favorite) return large ? 'text-white' : 'text-red-500';
        return large ? 'text-[var(--primary-color)]' : 'text-red-500';
    };

    const getButtonText = () => {
        if (!large) return null;
        return favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
    };

    const getTextColor = () => {
        return favorite ? 'text-white' : 'text-[var(--primary-color)]';
    };

    const HeartIcon = favorite ? AiFillHeart : AiOutlineHeart;

    return (
        <div className={`cursor-pointer inline-flex items-center space-x-2 ${getContainerClasses()}`}>
            <HeartIcon className={`w-6 h-6 ${getIconColor()}`} />
            {large && <span className={`mr-2 ${getTextColor()}`}>{getButtonText()}</span>}
        </div>
    );
};
