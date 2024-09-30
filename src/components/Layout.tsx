import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "../styles/layout.scss";
import { MenuIcon } from "lucide-react";
import { Modal } from "./Modal";
import { ThemeProvider, createTheme } from "@mui/material";
import { Input } from "./Input";
import { Footer } from "./Footer";
// import { Input } from "./Input";

interface Props {
  className?: string;
}
const theme = createTheme({
  palette: {
    primary: {
      main: "#E91E63", // Розовый цвет
    },
  },
});

export const Layout: React.FC<Props> = () => {
  const [popup, setPopup] = useState(false);

  const handlerModal = () => {
    setPopup(!popup);
  };

  return (
    <ThemeProvider theme={theme}>
      <header className="header">
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Link to={"/"} className="title">
              AnimeTime
            </Link>
          </div>
          <Input />
          <nav className="header_list">
            <NavLink to={"/serials"}>Список</NavLink>
            <NavLink to={"/filters"}>Фильтрация</NavLink>
            <NavLink to={"/random"}>Случайное</NavLink>
          </nav>
          {!popup ? (
            <MenuIcon className="menu-icon" onClick={() => handlerModal()} />
          ) : (
            <Modal handlerModal={handlerModal} />
          )}
        </div>
      </header>

      <Outlet />

      <Footer />
    </ThemeProvider>
  );
};
