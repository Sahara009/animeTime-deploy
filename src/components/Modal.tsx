import { X } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import lupa from "../assets/icons8-лупа.svg";

import { useAuth } from "../hooks/use-auth";

interface Props {
  className?: string;
  handlerModal: () => void;
}

export const Modal: React.FC<Props> = ({ handlerModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const handleMoreClick = () => {
    navigate(`/filters?searchTerm=${encodeURIComponent(searchTerm)}`);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };
  return (
    <div className="modal-content">
      <div className="modal-header">
        <X className="close" onClick={handlerModal} />
      </div>
      <nav className="header_modal">
        <div className="input-wrapper">
          <img src={lupa} className="search-icon" onClick={handleMoreClick} />
          <input
            type="text"
            className="modal-input"
            placeholder="Найти аниме"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>

        {isAuth ? (
          <>
            <Link to={"/account"}>Аккаунт</Link>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>Войти</NavLink>
            <NavLink to={"/registration"}>Регистрация</NavLink>
          </>
        )}
        <NavLink to={"/shedules"}>Рассписание</NavLink>
        <NavLink to={"/filters"}>Каталог</NavLink>
        <NavLink to={"/random"}>Рандомное</NavLink>
      </nav>
    </div>
  );
};
