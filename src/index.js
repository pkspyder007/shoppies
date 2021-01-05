import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css"
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./store";

ReactDOM.render(
    <StateProvider>
      <App />
    </StateProvider>,
  document.getElementById("root")
);

reportWebVitals();
