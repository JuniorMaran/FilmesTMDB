import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteButton } from '@/components/atoms/FavoriteButton';

import { BoxImage } from '@/components/atoms/BoxImage';
import { RatingTag } from '@/components/atoms/RatingTag';

import { type MoviePopularResults } from '@/services/tmdbService';

interface MovieBoxProps {
    movie: MoviePopularResults;
}

export const MovieBox: React.FC<MovieBoxProps> = ({ movie }) => {
    const [favorite, setFavorite] = useState<boolean>(false);

    const handleFavoriteClick = () => {
        setFavorite(!favorite);
    };

    return (
        <Link to={`/movie/${movie.id}`}>
            <div className="justify-self-center content-center p-3 m-1 sm:m-5 bg-[var(--primary-color)] rounded-md">
                <div className="relative">
                    <button className="absolute top-0 right-0" onClick={handleFavoriteClick}>
                        <FavoriteButton favorite={favorite} />
                    </button>
                </div>

                <BoxImage moviePosterPath={movie.poster_path} size='w300'/>

                <p
                    className="line-clamp-2 text-md leading-5 h-[2.5rem] mt-[12px] text-[var(--secundary-color)]"
                    title={movie.title}
                >
                    {movie.title}
                </p>
                <RatingTag rating={movie.vote_average} />
            </div>
        </Link>
    );
};
