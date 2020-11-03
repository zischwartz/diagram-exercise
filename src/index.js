import React from "react";
import ReactDOM from "react-dom";

import "./style.css";

import App from "./app.js";

import { defaultInitialElements } from "./configuration.js";

// Try loading our localstorage persisted data
const localElements = JSON.parse(localStorage.getItem("diagram_elements"));
// If we have the data in localstorage, use it, otherwise use the default from configuration.js
const initialElements =
  localElements && localElements.length
    ? localElements
    : defaultInitialElements;

ReactDOM.render(
  <App initialElements={initialElements} />,
  document.getElementById("app")
);

module.hot.accept();
