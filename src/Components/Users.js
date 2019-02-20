import React, { Component } from "react";
import axios from "axios";
import "../Style/Users.css";
import { BarLoader } from "react-css-loaders";

class Users extends Component {
  state = {
    users: [],
    loading: true
  };
  render() {
    const { users, loading } = this.state;
    return (
      <div className="topGrid">
        <h1 className="page-title">NC-News Users</h1>{" "}
        <div className="usersGrid">
          {users.map(user => {
            return loading ? (
              <BarLoader />
            ) : (
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
          users: data.users,
          loading: false
        });
      });
  };
}

export default Users;
