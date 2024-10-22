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
import { AccountPage } from "./pages/AccountPage";
import { Shedules } from "./pages/Shedules";
import { Collection } from "./pages/Collections";
import { useState } from "react";
import { FavoritesPage } from "./pages/FavoritesPage";

export function App() {
  const [isBackgroundDimmed, setIsBackgroundDimmed] = useState<boolean>(false);

  const toggleBackgroundDim = () => {
    setIsBackgroundDimmed(!isBackgroundDimmed);
  };

  return (
    <div className={`${isBackgroundDimmed ? "dimmed" : ""}`}>
      <div id="root">
        <div className="main">
          <SkeletonTheme>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Homepage />} />
                <Route
                  path="/serials/:code"
                  element={
                    <AnimeInfo
                      isBackgroundDimmed={isBackgroundDimmed}
                      toggleBackgroundDim={toggleBackgroundDim}
                    />
                  }
                />

                <Route path="/serials/" element={<AnimeList />} />
                <Route path="/random" element={<RandomPage />} />
                <Route path="/filters" element={<Filters />} />
                <Route path="/shedules" element={<Shedules />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/collections" element={<Collection />} />
                <Route path="/favorite" element={<FavoritesPage />} />
              </Route>
            </Routes>
          </SkeletonTheme>
        </div>
      </div>
    </div>
  );
}
