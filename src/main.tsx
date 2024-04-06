import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { getAnalytics } from "firebase/analytics";
import { app } from "./firebase.tsx";
import "./index.css";

//@ts-ignore
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
