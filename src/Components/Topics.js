import React, { Component } from "react";
import axios from "axios";
import { Link } from "@reach/router";

class Topics extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;
    return (
      <div className="topGrid">
        <h1 className="page-title">NC-News Topics</h1>
        <div className="topicGrid">
          {topics.map(topic => {
            return (
              <div className="container" key={topic.slug}>
                <Link className="addArticle" to={`${topic.slug}/articles`}>
                  {topic.slug}
                </Link>
                <p>{topic.description}</p>
              </div>
            );
          })}
        </div>
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
