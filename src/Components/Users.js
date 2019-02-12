import React, { Component } from "react";
import axios from "axios";
import "../Style/Users.css";

class Users extends Component {
  state = {
    users: []
  };
  render() {
    const { users } = this.state;
    return (
      <div className="topGrid">
        <h1 className="page-title">Users</h1>{" "}
        <div className="usersGrid">
          {users.map(user => {
            return (
              <div className="container" key={user.username}>
                <img
                  src={user.avatar_url}
                  alt="Avatar pic"
                  height="100"
                  width="100"
                />
                <p>
                  Name : {user.name}
                  <br />
                  Username: {user.username}{" "}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get("https://nc-knews777.herokuapp.com/api/users")
      .then(({ data }) => {
        this.setState({
          users: data.users
        });
      });
  };
}

export default Users;
