import { StrictMode } from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import styles from "./App.css";

render(
  <StrictMode>
    <App styles={styles} />
  </StrictMode>,
  document.getElementById("root")
);
