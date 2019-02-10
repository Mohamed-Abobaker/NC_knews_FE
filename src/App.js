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
            <Home path="/" user={user} logoutFunc={this.logoutFunc} />
            <Articles
              path="/articles"
              user={user}
              logoutFunc={this.logoutFunc}
            />
            <SingleArticle
              path="/articles/:id"
              user={user}
              logoutFunc={this.logoutFunc}
            />
            <Users path="/users" logoutFunc={this.logoutFunc} />
            <NewArticle
              path="articles/new_article"
              user={user}
              logoutFunc={this.logoutFunc}
            />
            <NotFound default logoutFunc={this.logoutFunc} />
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
  logoutFunc = () => {
    this.setState({
      user: ""
    });
  };
}

export default App;
