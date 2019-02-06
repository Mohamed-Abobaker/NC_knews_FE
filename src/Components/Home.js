import React, { Component } from "react";
import { Link } from "@reach/router";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to NC-News!</h1>
        <Link to="/articles/new_article">Write a new article</Link>
      </div>
    );
  }
}

export default Home;
