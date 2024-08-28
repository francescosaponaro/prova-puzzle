import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTES from '@routes/constants';

// LAZY LOADING COMPONENTS
const Home = React.lazy(() => import('./app/Home'));
const Puzzle = React.lazy(() => import('./app/Puzzle'));

const AppComponent = () => {
  return (
    <>
      <Suspense fallback={<div aria-live="polite" style={{ visibility: 'hidden' }}>Loading...</div>}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={`${ROUTES.PUZZLE}/:id`} element={<Puzzle />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppComponent;
