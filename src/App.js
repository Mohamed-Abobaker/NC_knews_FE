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
import Topics from "./Components/Topics";
import SingleTopic from "./Components/SingleTopic";

class App extends Component {
  state = {
    user: ""
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Auth user={this.state.user} setUser={this.setUser}>
          <div>
            <Nav logoutFunc={this.logoutFunc} />
          </div>
          <div>
            <Router>
              <Home path="/" user={user} />
              <Articles path="/articles" user={user} />
              <SingleArticle path="/articles/:id" user={user} />
              <Topics path="topics" />
              <SingleTopic path="topics/:slug/articles" />
              <Users path="/users" />
              <NewArticle path="articles/new_article" user={user} />
              <NotFound default />
              {/* <LoginForm path="/test" /> */}
            </Router>
          </div>
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
