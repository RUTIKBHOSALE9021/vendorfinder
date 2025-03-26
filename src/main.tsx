import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";

import { configureAPI } from "./api.ts";
import { store } from "./redux/store.ts";

configureAPI(import.meta.env.VITE_BASE_URL);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
