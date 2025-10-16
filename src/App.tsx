import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layout';
import { FavoriteMoviesProvider } from '@/contexts/FavoriteMoviesContext';
// Lazy loading de todas as páginas
const Home = React.lazy(() => import('@/pages/Home').then((module) => ({ default: module.Home })));
const Favorites = React.lazy(() =>
    import('@/pages/Favorites').then((module) => ({ default: module.Favorites }))
);
const MovieDetails = React.lazy(() =>
    import('@/pages/MovieDetails').then((module) => ({ default: module.MovieDetails }))
);
const NotFound = React.lazy(() =>
    import('@/pages/NotFound').then((module) => ({ default: module.NotFound }))
);
const SearchResults = React.lazy(() =>
    import('@/pages/SearchResults').then((module) => ({ default: module.SearchResults }))
);

// Componente de loading
const PageLoader: React.FC = () => (
    <div>
        {/* <Spin size="large" /> */}
        <span>Carregando...</span>
    </div>
);

const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </Suspense>
    );
};

const App: React.FC = () => {
    return (
        <FavoriteMoviesProvider>
            <Router>
                <AppRoutes />
            </Router>
        </FavoriteMoviesProvider>
    );
};

export default App;
