import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./styles/root.scss";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);