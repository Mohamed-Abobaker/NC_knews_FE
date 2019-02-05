import React from "react";
import { Link } from "@reach/router";

const Nav = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      {" | "}
      <Link to="/articles">Articles</Link>
      {" | "}
      <Link to="/users">Users</Link>
    </nav>
  );
};

export default Nav;
