import { Route, Routes } from "react-router-dom";
import { AnimeInfo, AnimeList, Homepage, Layout } from "./components";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { RandomPage } from "./components/RandomPage";
import "./styles/root.scss";
import { Filters } from "./components/Filters";

export function App() {
  return (
    <div id="root">
      <div className="main">
        <SkeletonTheme>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/serials/:code" element={<AnimeInfo />} />
              <Route path="/serials/" element={<AnimeList />} />
              <Route path="/random" element={<RandomPage />} />
              <Route path="/filters" element={<Filters />} />
            </Route>
          </Routes>
        </SkeletonTheme>
      </div>
    </div>
  );
}
