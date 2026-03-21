import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import Comprar from "./pages/Comprar"
import "./index.css"
import "./styles.css"

const path = window.location.pathname

const Component = path === "/comprar" ? Comprar : App

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
)