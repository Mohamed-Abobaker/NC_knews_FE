import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  state = {
    users: []
  };
  render() {
    const { users } = this.state;
    console.log(users);
    return (
      <div>
        <h1>Users</h1>{" "}
        {users.map(user => {
          return (
            <div key = {user.username}>
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
