import React, { Component } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import "../Article.css";

class Articles extends Component {
  state = {
    articles: [],
    topics: [],
    chosenTopic: "All",
    criteria: "created_at"
  };

  render() {
    const { articles, topics } = this.state;
    const { user } = this.props;
    return (
      <div className="topGrid">
        <div>
          <h1>NC-News Articles</h1>
        </div>
        <div>
          <p>Hey {user}, wanna add a new article?</p>
          <Link to="/articles/new_article">Add new article</Link>{" "}
        </div>
        <div>
          <label>
            Filter Articles by Topic:
            <select onChange={this.assignTopic}>
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
        <div>
          <label>
            Sort by:
            <select onChange={this.assignSortBy}>
              <option key={"disabled"} value={null} defaultValue disabled>
                Choose sort criteria
              </option>
              <option value="created_at">Date created</option>
              <option value="comment_count">Comment count</option>
              <option value="votes">Votes</option>
            </select>
          </label>
        </div>
        <div>
          <h4>Number of Articles : {articles.length}</h4>
          {articles.map(article => {
            return (
              <React.Fragment key={article.article_id}>
                <p>
                  Title : {article.title}
                  <br /> Author : {article.author}
                  <br /> Topic : {article.topic}
                </p>
                <Link to={`/articles/${article.article_id}`}>View Article</Link>
              </React.Fragment>
            );
          })}
        </div>
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

  assignTopic = e => {
    this.setState(
      {
        chosenTopic: e.target.value
      },
      () => this.sortArticles()
    );
  };

  assignSortBy = e => {
    this.setState(
      {
        criteria: e.target.value
      },
      () => this.sortArticles()
    );
  };

  sortArticles = () => {
    const { chosenTopic, criteria } = this.state;
    let url = `https://nc-knews777.herokuapp.com/api/articles?limit=1000000&&sort_by=${criteria}`;
    if (chosenTopic !== "All" && criteria !== "Default") {
      url = `https://nc-knews777.herokuapp.com/api/topics/${chosenTopic}/articles?limit=1000000&&sort_by=${criteria}`;
    }
    axios.get(url).then(({ data }) => {
      this.setState({
        articles: data.articles
      });
    });
  };
}

export default Articles;
