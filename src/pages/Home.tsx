import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';

import { tmdbService, type MoviePopularResults } from '@/services/tmdbService';
import { MovieBox } from '@/components/molecules/MovieBox';

export const Home: React.FC = () => {
    const [moviePopular, setMoviePopular] = useState<MoviePopularResults[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const loadMoviePopularData = async () => {
        try {
            setIsLoading(true);
            const response = await tmdbService.getMoviePopular();
            setMoviePopular(response?.results);
        } catch (error) {
            console.error('Error fetching popular movies:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadMoviePopularData();
    }, []);

    return (
        <>
        
        <p className='m-10 text-[var(--primary-color)] text-2xl'>Filmes em Cartaz...</p>
        <div className="m-2 sm:m-10">
            <Swiper
                navigation={true}
                grid={{ rows: 2, fill: 'row' }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    1: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 6
                    },
                }}
                modules={[Grid, Navigation]}
            >
                {moviePopular.length > 0 &&
                    moviePopular.map((movie) => (
                        <SwiperSlide >
                            <MovieBox key={movie.id} movie={movie} isLoading={isLoading} />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
        </>
    );
};
