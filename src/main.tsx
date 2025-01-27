import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/css/index.css";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Analytics />
  </React.StrictMode>
);
