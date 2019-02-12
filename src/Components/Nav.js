import React from "react";
import { Link } from "@reach/router";
import "../App.css";

const Nav = () => {
  return (
    <div className="topNav">
      <h1>Northcoder News</h1>
      <div className="navBar">
        <nav>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/articles">Articles</Link>
          {" | "}
          <Link to="/topics">Topics</Link>
          {" | "}
          <Link to="/users">Users</Link>
        </nav>
        <div>
          <button type="button" onClick={() => this.props.logoutFunc()}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
