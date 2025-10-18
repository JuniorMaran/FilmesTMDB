import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

interface FavoriteButtonProps {
    favorite: boolean;
    large?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ favorite, large }) => {
    return (
        <div className="rounded-full cursor-pointer inline-flex items-center space-x-2">
            {favorite ? (
                <AiFillHeart className="text-red-500 w-6 h-6" />
            ) : (
                <AiOutlineHeart className="text-red-500 w-6 h-6" />
            )}

            {large && !favorite && <span className='mr-2'>Adicionar aos favoritos</span>}
            {large && favorite && <span className='mr-2'>Remover dos favoritos</span>}
        </div>
    );
};
