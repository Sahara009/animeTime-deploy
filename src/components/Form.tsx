import React, { useState } from "react";
import sticker1 from "../assets/das_frieren_011.webp";
import sticker2 from "../assets/das_frieren_023.webp";

interface FormProps {
  title: string;
  handleSubmit: (email: string, password: string) => void;
}

export const Form: React.FC<FormProps> = ({ title, handleSubmit }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">{title}</h2>

        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш email"
            className="form-input"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ваш пароль"
            className="form-input"
          />
        </div>

        <button
          onClick={() => handleSubmit(email, password)}
          className="submit-button"
        >
          {title}
        </button>

        <img className="sticker sticker-1" src={sticker1} alt="" />
        <img className="sticker sticker-2" src={sticker2} alt="" />
      </div>
    </div>
  );
};
