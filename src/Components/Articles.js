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
    // const { user } = this.props;
    return (
      <div className="topGrid">
        <h1 className="page-title">NC-News Articles</h1>
        {/* <div className="container2"> */}
        <Link className="addArticle" to="/articles/new_article">
          Create Article {/* Hey {user}, wanna add a new article? */}
        </Link>{" "}
        {/* </div> */}
        <div className="container2">
          <div>
            <label>
              Filter Topic:&nbsp;
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
              &nbsp;&nbsp;&nbsp;Sort by:&nbsp;
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
          <div className="containerTitle">
            <h4 className="subHeadings">
              Number of Articles : {articles.length}
            </h4>
          </div>
          {articles.map(article => {
            return (
              <div className="tcontainer" key={article.article_id}>
                <Link
                  className="articleTitle"
                  to={`/articles/${article.article_id}`}
                >
                  {article.title}
                </Link>
                <p>
                  <i>Posted by</i> {article.author}
                  <br />
                  {article && article.created_at.substring(0, 10)}
                  <br /> <i>Topic: &nbsp;</i> {article.topic}
                  <br />
                  <i>Votes: &nbsp;</i> {article.votes}
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
