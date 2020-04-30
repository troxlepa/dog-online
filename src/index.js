import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

import './i18n';

if (window.screen.width > 1280)
  document
    .getElementById("viewport")
    .setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
