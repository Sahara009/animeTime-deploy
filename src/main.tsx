import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import "./firebase";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);
