import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { FavoriteButton } from '@/components/atoms/FavoriteButton';

import { BoxImage } from '@/components/atoms/BoxImage';
import { RatingTag } from '@/components/atoms/RatingTag';
import { HighlightedTitle } from '@/components/atoms/HighlightedTitle';

import { type MovieByIdResponse, type MoviePopularResults } from '@/services/tmdbService';
import { useFavoriteMovies } from '@/contexts/FavoriteMoviesContext';
import { useSearch } from '@/contexts/SearchContext';
import { formatDate } from '@/utils/dateUtils';

type FavoriteMovie = MovieByIdResponse | MoviePopularResults;

interface MovieBoxProps {
    movie: FavoriteMovie;
    variant?: 'default' | 'favorite' | 'search';
}

export const MovieBox: React.FC<MovieBoxProps> = ({ movie, variant = 'default' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addMovie, removeMovie, isFavorite } = useFavoriteMovies();
    const { searchTerm } = useSearch();
    const favorite = isFavorite(movie.id);

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (favorite) {
            removeMovie(movie.id);
        } else {
            addMovie(movie);
        }
    };

    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        removeMovie(movie.id);
    };

    const renderButton = () => {
        if (variant === 'favorite') {
            return (
                <button
                    className="absolute top-0 right-0 rounded-full p-2 m-1 cursor-pointer bg-red-500 hover:bg-red-600 transition-colors inline-flex items-center space-x-2"
                    onClick={handleRemoveClick}
                    title="Remover dos favoritos"
                >
                    <MdDeleteOutline className="text-white w-6 h-6" />
                </button>
            );
        }

        return (
            <button className="absolute top-3 right-3" onClick={handleFavoriteClick}>
                <FavoriteButton favorite={favorite} />
            </button>
        );
    };

    const renderTitle = () => {
        if (variant === 'search') {
            return <HighlightedTitle title={movie.title} searchTerm={searchTerm} />;
        }
        return movie.title;
    };

    return (
        <Link to={`/movie/${movie.id}`}>
            <div
                className="flex flex-col h-full max-w-[250px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-md relative hover:scale-115 z-0 hover:z-50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="absolute top-3 left-3">
                    <RatingTag rating={movie.vote_average}/>
                </div>
                <div className="relative">
                    {renderButton()}
                </div>
                <BoxImage moviePosterPath={movie.poster_path} size="w300" />
                <div className="p-3 flex flex-col flex-grow bg-white rounded-b-md">
                    <p
                        className="line-clamp-2 text-md leading-5 h-[2.5rem] text-[var(--primary-color)] flex-grow"
                        title={movie.title}
                    >
                        {renderTitle()}
                    </p>
                    {isHovered && (
                        <div className="mt-3 pt-3 border-t border-gray-300 animate-fadeIn">
                            {movie.release_date && (
                                <p className="text-xs text-[var(--primary-color)] mb-2">
                                    📅 {formatDate(movie.release_date, 'DD/MM/YYYY')}
                                </p>
                            )}
                            {movie.overview && (
                                <p className="text-xs text-[var(--primary-color)] line-clamp-3">
                                    {movie.overview}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};
