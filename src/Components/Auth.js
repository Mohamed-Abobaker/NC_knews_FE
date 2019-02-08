import React, { Component } from "react";
import axios from "axios";

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
          <h3>Welcome to NC-News!</h3>
          <h5>Please submit your username to login</h5>
          {hasError && <p>Sorry this username does not exist</p>}
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              placeholder={"username"}
              type="text"
              value={input}
            />
            <button type="submit">submit</button>
          </form>
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