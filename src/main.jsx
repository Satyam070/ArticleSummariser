import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import './App.css'
import { AuthProvider } from "./context/AuthProvider";

import App from "./App";
import { store } from "./services/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>

    </Provider>
  </React.StrictMode>
);