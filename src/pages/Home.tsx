import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '@/services/tmdbService';
import { Pagination } from '@/components/organisms/Pagination';
import { MovieBox } from '@/components/molecules/MovieBox';

export const Home: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const { data, isLoading } = useQuery({
        queryKey: ['moviePopular', currentPage],
        queryFn: () => tmdbService.getMoviePopular(currentPage),
        staleTime: 1000 * 60 * 5,
    });

    const moviePopular = data?.results || [];
    const totalPages = data?.total_pages || 0;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="mx-8 justify-self-center">
            <p className="my-10 text-[var(--primary-color)] text-2xl">Todos os Filmes...</p>
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <p className="text-[var(--primary-color)]">Carregando filmes...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[2vw] mb-8 auto-rows-max overflow-visible">
                            {moviePopular.length > 0 &&
                                moviePopular.map((movie) => <MovieBox movie={movie} />)}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            isLoading={isLoading}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </>
    );
};
