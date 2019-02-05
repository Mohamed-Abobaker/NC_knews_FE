import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";
import Users from "./Components/Users";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Router>
          <Home path="/" />
          <Articles path="/articles" />
          <SingleArticle path="/articles/:id" />
          <Users path="/users" />
        </Router>
      </div>
    );
  }
}

export default App;
