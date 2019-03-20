import React, { Component } from "react";
import { Link } from "@reach/router";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footerLogo">
          <Link to="//www.linkedin.com/in/mohamed-abobaker-91972b164">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJyUU01uQrY0CQsORdU_Hly2phJVYL7ukOYony0DwQeH8Yuspl"
              alt="linkedIn"
              height="70"
              width="70"
            />
          </Link>
        </div>
        <div>
          <h3>Site Links</h3>
          <Link className="siteLink" to="/">
            Home
          </Link>
          <br />

          <Link className="siteLink" to="/articles">
            Articles
          </Link>
          <br />
          <Link className="siteLink" to="/topics">
            Topics
          </Link>
          <br />
          <Link className="siteLink" to="/users">
            Users
          </Link>
          <br />
        </div>

        <p className="footerCredentials ">Mohamed Abobaker © 2019</p>
      </div>
    );
  }
}

export default Footer;
