import { useState } from "react";

interface FormProps {
  title: string;
  handleSubmit: (email: string, password: string) => void;
}

export const Form: React.FC<FormProps> = ({ title, handleSubmit }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ваш email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Ваш пароль"
      />
      <button onClick={() => handleSubmit(email, password)}>{title}</button>
    </div>
  );
};
