import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Home from "./Components/Home";
import Nav from "./Components/Nav";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Router>
          <Home path="/" />
        </Router>
      </div>
    );
  }
}

export default App;
