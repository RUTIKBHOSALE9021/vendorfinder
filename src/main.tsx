import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { configureAPI } from "./api.ts";

configureAPI(import.meta.env.VITE_BASE_URL);

createRoot(document.getElementById("root")!).render(<App />);
