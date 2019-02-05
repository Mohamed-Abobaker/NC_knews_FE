import React, { Component } from "react";
import axios from "axios";
import { Link } from "@reach/router";

class Articles extends Component {
  state = {
    articles: [],
    topics: null
  };

  render() {
    const { articles, topics } = this.state;
    // console.log(articles);
    return (
      <div>
        <h1>Articles</h1>
        <div>
          <label>
            Filter Articles by Topic:
            <select onChange={this.topicChange}>
              <option key={"disabled"} value={null} defaultValue disabled>
                Choose topic
              </option>
              <option value="All">All Topics</option>
              {topics &&
                topics.map(topic => {
                  return (
                    <option key={topic.slug} value={topic.slug}>
                      {topic.slug}
                    </option>
                  );
                })}
            </select>
          </label>
        </div>
        <h4>Number of Articles : {articles.length}</h4>
        {articles.map(article => {
          return (
            <React.Fragment key={article.article_id}>
              <p>
                Title : {article.title}
                <br /> Author : {article.author}
              </p>
              <Link to={`/articles/${article.article_id}`}>View Article</Link>
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    this.getArticles();
    this.getTopics();
  }

  getArticles = () => {
    axios
      .get("https://nc-knews777.herokuapp.com/api/articles?limit=1000000")
      .then(({ data }) => {
        this.setState({
          articles: data.articles
        });
      });
  };

  getTopics = () => {
    axios
      .get("https://nc-knews777.herokuapp.com/api/topics")
      .then(({ data }) => {
        this.setState({
          topics: data.topics
        });
      });
  };

  topicChange = e => {
    const topic = e.target.value;
    if (topic !== "All") {
      axios
        .get(
          `https://nc-knews777.herokuapp.com/api/topics/${topic}/articles?limit=1000000`
        )
        .then(({ data }) => {
          this.setState({
            articles: data.articles
          });
        });
    } else {
      this.getArticles();
    }
  };
}

export default Articles;
