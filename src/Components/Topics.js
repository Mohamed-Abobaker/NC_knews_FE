import React, { Component } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import { BarLoader } from "react-css-loaders";

class Topics extends Component {
  state = {
    topics: [],
    loading: true
  };
  render() {
    const { topics, loading } = this.state;
    return (
      <div className="topGrid">
        <h1 className="page-title">NC-News Topics</h1>
        <div className="topicGrid">
          {topics.map(topic => {
            return loading ? (
              <BarLoader />
            ) : (
              <div className="topic-container" key={topic.slug}>
                <Link className="topicTitle" to={`${topic.slug}/articles`}>
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
          topics: data.topics,
          loading: false
        });
      });
  };
}

export default Topics;
