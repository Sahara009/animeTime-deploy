import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "../styles/layout.scss";
import { MenuIcon } from "lucide-react";
import { Modal } from "./Modal";
import { ThemeProvider, createTheme } from "@mui/material";
import { Input } from "./Input";
import { Footer } from "./Footer";
import { useAuth } from "../hooks/use-auth";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/slices/userSlice";
import catAvatar from "../assets/cat-avatar-generator-svgrepo-com.svg";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E91E63",
    },
  },
});

export const Layout = () => {
  const [popup, setPopup] = useState(false);
  const { isAuth } = useAuth();
  const dispatch = useDispatch();

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
            {isAuth ? (
              <>
                <a href="#">
                  <img
                    style={{ width: 50, display: "flex", alignItems: "center" }}
                    src={catAvatar}
                    alt="avatar"
                  />
                </a>
                <button
                  style={{ color: "white" }}
                  onClick={() => {
                    dispatch(removeUser());
                  }}
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <NavLink to={"/login"}>Войти</NavLink>
                <NavLink to={"/registration"}>Регистрация</NavLink>
              </>
            )}
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
