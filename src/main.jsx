import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import "./index.css";
// import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
