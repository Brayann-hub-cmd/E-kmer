// import { AppProvider } from './context/AppContext.jsx';

// import React from "react"
// import ReactDOM from "react-dom/client"
// import App from "./App.jsx"
// import "./index.css"

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AppProvider>
//       <App />
//     </AppProvider>
//   </React.StrictMode>
// )

import { HelmetProvider } from "react-helmet-async";
import { AppProvider } from "./context/AppContext";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </HelmetProvider>
  </React.StrictMode>
);


