import { X } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  className?: string;
  handlerModal: () => void;
}

export const Modal: React.FC<Props> = ({ handlerModal }) => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <X className="close" onClick={handlerModal} />
      </div>
      <nav className="header_modal">
        <NavLink to={"/serials"}>Serials</NavLink>
        <NavLink to={"/filters"}>Genres</NavLink>
        <NavLink to={"/random"}>Random</NavLink>
      </nav>
    </div>
  );
};
