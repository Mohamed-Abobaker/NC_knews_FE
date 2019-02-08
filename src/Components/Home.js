import React, { Component } from "react";
import { Link } from "@reach/router";

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Welcome back to NC-News {`${user}`}!</h1>
        <h6>Hey {`${user}`}</h6>
        <Link to="/articles/new_article">Write a new article</Link>
      </div>
    );
  }
}

export default Home;
