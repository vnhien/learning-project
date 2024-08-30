import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * TODO:
 * - login
 * - logout
 * - profile
 * - chat
 * - follow
 * - get video
 * - comments
 * - livestream
 * - comment display (real time)
 *
 */
