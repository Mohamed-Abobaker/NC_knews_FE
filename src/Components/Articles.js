import React, { Component } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import "../Style/Article.css";
import "../App.css";

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
        <h1 className="page-title">NC-News Articles</h1>
        <div className="container">
          <h3>
            <Link to="/articles/new_article">
              Hey {user}, wanna add a new article?
            </Link>{" "}
          </h3>
        </div>
        <div className="container">
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
        </div>
        <div className="container">
          <h4>Number of Articles : {articles.length}</h4>
          {articles.map(article => {
            return (
              <div className="tcontainer" key={article.article_id}>
                <p>
                  <Link to={`/articles/${article.article_id}`}>
                    {article.title}
                  </Link>
                  <br /> Posted by {article.author}
                  <br />
                  {article && article.created_at.substring(0, 10)}
                  <br /> Topic : {article.topic}
                </p>
              </div>
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
