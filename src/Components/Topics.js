import React, { Component } from "react";
import axios from "axios";
import { Link } from "@reach/router";

class Topics extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;
    console.log(topics);
    return (
      <div>
        <h1>Topics</h1>
        {topics.map(topic => {
          return (
            <div>
              <Link to={`${topic.slug}/articles`}>Topic: {topic.slug}</Link>
              <p>Description: {topic.description}</p>
            </div>
          );
        })}
      </div>
    );
  }
  componentDidMount() {
    this.getTopics();
  }

  getTopics = () => {
    axios
      .get("https://nc-knews777.herokuapp.com/api/topics")
      .then(({ data }) => {
        this.setState({
          topics: data.topics
        });
      });
  };
}

export default Topics;
