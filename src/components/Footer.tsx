import React from "react";
import { Link } from "react-router-dom";
import telegram from "../assets/telegram.svg";
import github from "../assets//github.svg";
import add from "../assets/85e0df96fb78ee2424ad7447005c728e.gif";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = () => {
  return (
    <footer className="footer">
      <div className="side-left">
        <div className="media_info">
          <h4>AnimeTime</h4>
          <p>Developed by: Sahara</p>
        </div>
        <div className="socials_icons">
          <Link to={"https://t.me/Hcth5"}>
            <img width={40} src={telegram} alt="" />
          </Link>

          <Link to={"https://github.com/Sahara009"}>
            <img width={40} src={github} alt="" />
          </Link>
        </div>
      </div>
      <div className="side-center">
        <img src={add} alt="" />
      </div>
      <div className="side-right">
        <h4>Права</h4>
        <p>
          Весь материал на сайте представлен исключительно для бесплатного
          домашнего ознакомительного просмотра.
        </p>
      </div>
    </footer>
  );
};
