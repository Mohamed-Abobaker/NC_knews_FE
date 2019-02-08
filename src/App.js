import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";
import Users from "./Components/Users";
import NewArticle from "./Components/NewArticle";
import Auth from "./Components/Auth";
import NotFound from "./Components/NotFound";

class App extends Component {
  state = {
    user: ""
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Auth user={this.state.user} setUser={this.setUser}>
          <Nav />
          <Router>
            <Home path="/" user={user} />
            <Articles path="/articles" />
            <SingleArticle path="/articles/:id" />
            <Users path="/users" />
            <NewArticle path="articles/new_article" />
            <NotFound default />
          </Router>
        </Auth>
      </div>
    );
  }
  setUser = name => {
    this.setState({
      user: name
    });
  };
}

export default App;
