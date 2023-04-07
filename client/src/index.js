import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "flowbite";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
