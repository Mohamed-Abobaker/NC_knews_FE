import React, { Component } from "react";
import { Link } from "@reach/router";
import "../App.css";

class Nav extends Component {
  render() {
    // const { logoutFunc } = this.props;
    // console.log(this.props);
    return (
      <div className="topNav">
        <h1>Northcoder News</h1>
        <div className="navBar">
          <nav>
            <Link className="navLink" to="/">
              Home
            </Link>
            {"        "}
            <Link className="navLink" to="/articles">
              Articles
            </Link>
            {"        "}
            <Link className="navLink" to="/topics">
              Topics
            </Link>
            {"        "}
            <Link className="navLink" to="/users">
              Users
            </Link>
          </nav>
          <div>
            <button
              className="navButtons"
              type="button"
              onClick={() => this.props.logoutFunc()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
