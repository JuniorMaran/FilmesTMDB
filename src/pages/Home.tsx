import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';

import { tmdbService, type MoviePopularResults } from '@/services/tmdbService';
import { Pagination } from '@/components/organisms/Pagination';
import { MovieBox } from '@/components/molecules/MovieBox';

export const Home: React.FC = () => {
    const [moviePopular, setMoviePopular] = useState<MoviePopularResults[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const loadMoviePopularData = async (page: number = 1) => {
        try {
            setIsLoading(true);
            const response = await tmdbService.getMoviePopular(page);
            setMoviePopular(response?.results || []);
            setTotalPages(response?.total_pages || 0);
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error fetching popular movies:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadMoviePopularData(1);
    }, []);

    return (
        <>

        <p className='m-10 text-[var(--primary-color)] text-2xl'>Filmes em Cartaz...</p>
        <div className="m-2 sm:m-10">
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <p className="text-[var(--primary-color)]">Carregando filmes...</p>
                </div>
            ) : (
                <>
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
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 6
                            },
                        }}
                        modules={[Grid, Navigation]}
                    >
                        {moviePopular.length > 0 &&
                            moviePopular.map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <MovieBox movie={movie} />
                                </SwiperSlide>
                            ))}
                    </Swiper>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        isLoading={isLoading}
                        onPageChange={loadMoviePopularData}
                    />
                </>
            )}
        </div>
        </>
    );
};
