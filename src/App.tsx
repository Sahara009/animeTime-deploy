import { Route, Routes } from "react-router-dom";
import { AnimeList, Layout } from "./components";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "./styles/root.scss";
import {
  Homepage,
  RandomPage,
  AnimeInfo,
  Filters,
  LoginPage,
  RegistrationPage,
} from "./pages/index";

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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
            </Route>
          </Routes>
        </SkeletonTheme>
      </div>
    </div>
  );
}
