import React, { Component } from "react";
import "../App.css";

class Auth extends Component {
  state = {
    users: [
      "tickle122",
      "happyamy2016",
      "weegembump",
      "grumpy19",
      "cooljmessy",
      "jessjelly"
    ],
    hasError: false,
    chosenUser: "tickle122"
  };
  render() {
    const { user, children } = this.props;
    const { hasError, users } = this.state;
    if (user) {
      return children;
    } else {
      return (
        <div>
          <div className="auth">
            <h2 className="page-title">NC-News Login</h2>
            <p>
              <b>Please choose a user to login with:</b>
            </p>
            {hasError && <p>Sorry this username does not exist</p>}
            <br />
            <form onSubmit={this.handleSubmit}>
              {/* <input
                required
                onChange={this.handleChange}
                placeholder={"username"}
                type="text"
                value={input}
              /> */}
              <select onChange={this.assignUser}>
                <option key={"disabled"} value={null} defaultValue disabled>
                  CHOOSE USER
                </option>
                {users.map(singleUser => {
                  return (
                    <option key={singleUser} value={singleUser}>
                      {singleUser}
                    </option>
                  );
                })}
              </select>

              <button type="submit">Login</button>
            </form>
            <br />
            <br />
            <br />
            <br />
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
    const { chosenUser } = this.state;
    // axios
    //   .get(`https://nc-knews777.herokuapp.com/api/users/${input}`)
    //   .then(({ data }) => {
    //     if (data) {
    this.props.setUser(chosenUser);

    //   });
    // }
  };

  assignUser = e => {
    this.setState({
      chosenUser: e.target.value
    });
  };
}

export default Auth;
