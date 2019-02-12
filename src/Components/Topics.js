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
      <div className="topGrid">
        <h1 className="page-title">Topics</h1>
        {topics.map(topic => {
          return (
            <div className="container">
              <p>
                <Link to={`${topic.slug}/articles`}>{topic.slug}</Link> <br />
                {topic.description}
              </p>
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
