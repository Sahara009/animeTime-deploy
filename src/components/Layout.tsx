import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "../styles/layout.scss";
import { MenuIcon } from "lucide-react";
import { Modal } from "./Modal";
import { ThemeProvider, createTheme } from "@mui/material";
import { Input } from "./Input";
import { Footer } from "./Footer";
import { useAuth } from "../hooks/use-auth";
import { RootState } from "../store";
import catAvatar from "../assets/cat-avatar-generator-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from "../store/slices/userSlice";
import favorite from "../assets/favorite-svgrepo-com.svg";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E91E63",
    },
  },
});

export const Layout = () => {
  const dispatch = useDispatch();
  const selectedAvatar = useSelector(
    (state: RootState) => state.user.selectedAvatar
  );

  useEffect(() => {
    const storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) {
      dispatch(setAvatar(storedAvatar));
    }
  }, [dispatch]);
  const [popup, setPopup] = useState(false);
  const { isAuth } = useAuth();

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
          <nav className="header_list">
            {/* <NavLink to={"/news"}>Новости</NavLink> */}
            <NavLink to={"/filters"}>Каталог</NavLink>
            <NavLink to={"/random"}>Случайное</NavLink>
            <NavLink to={"/shedules"}>Рассписание</NavLink>
            <NavLink to={"/collections"}>Коллекции</NavLink>
          </nav>
          <Input />
          {isAuth ? (
            <>
              <Link to={"/account"}>
                <img
                  className="avatar"
                  style={{ width: 50, display: "flex", alignItems: "center" }}
                  src={selectedAvatar || catAvatar}
                  alt="avatar"
                />
              </Link>
            </>
          ) : (
            // <nav className="account-log">
            //   <NavLink className="login" to={"/login"}>
            //     Войти
            //   </NavLink>
            //   <NavLink className="registration" to={"/registration"}>
            //     Регистрация
            //   </NavLink>
            // </nav>
            <NavLink className="favorite" to={"/favorite"}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                Избранное
                <img style={{ width: 25 }} src={favorite} alt="" />
              </div>
            </NavLink>
          )}

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
