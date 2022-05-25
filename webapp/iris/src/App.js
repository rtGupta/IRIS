import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import ResponsiveAppBar from "./components/appbar";
import R from "./config/routes/routes";

import "./styles/main.scss";

class App extends Component {
  render() {
    console.log(window.location);
    return (
      <div className="app">
        <BrowserRouter>
          <ResponsiveAppBar />
          <R />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
