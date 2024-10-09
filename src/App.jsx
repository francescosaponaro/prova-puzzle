import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "@routes/constants";
import { AnimatePresence } from "framer-motion";

// LAZY LOADING COMPONENTS
const PublicRoute = React.lazy(() => import("./routes/containers/PublicRoute"));
const Home = React.lazy(() => import("./app/Home"));
const Puzzle = React.lazy(() => import("./app/Puzzle"));

const AppComponent = () => {
  return (
    <>
      <Suspense
        fallback={
          <div aria-live="polite" style={{ visibility: "hidden" }}>
            Loading...
          </div>
        }
      >
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path={ROUTES.HOME}
              element={<PublicRoute RouteComponent={Home} />}
            />
            <Route
              path={`${ROUTES.PUZZLE}/:id/:puzzle_orientation`}
              element={<PublicRoute RouteComponent={Puzzle} />}
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
};

export default AppComponent;
