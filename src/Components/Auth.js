import React, { Component } from "react";
import axios from "axios";
import "../App.css";

class Auth extends Component {
  state = {
    input: "",
    hasError: false
  };
  render() {
    const { user, children } = this.props;
    const { hasError } = this.state;
    if (user) {
      return children;
    } else {
      const { input } = this.state;
      return (
        <div>
          <div className="auth">
            <h2 className="page-title">NC-News Login</h2>
            <p>
              <b>Please submit your username to login</b>
            </p>
            {hasError && <p>Sorry this username does not exist</p>}
            <form onSubmit={this.handleSubmit}>
              <input
                required
                onChange={this.handleChange}
                placeholder={"username"}
                type="text"
                value={input}
              />
              <button type="submit">submit</button>
            </form>
            <p>
              (Hiring partners and visitors please use 'jessjelly' as a username
              login)
            </p>
          </div>
        </div>
      );
    }
  }

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      input: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { input } = this.state;
    axios
      .get(`https://nc-knews777.herokuapp.com/api/users/${input}`)
      .then(({ data }) => {
        if (data) {
          this.props.setUser(input);
          this.setState({
            input: ""
          });
        }
      })
      .catch(err => {
        this.setState({
          hasError: true
        });
      });
  };
}

export default Auth;
