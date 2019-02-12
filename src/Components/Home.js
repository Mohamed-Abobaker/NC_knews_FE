import React, { Component } from "react";
import { Link } from "@reach/router";
import axios from "axios";
import "../Style/Home.css";
import "../App.css";

class Home extends Component {
  state = {
    articles: [],
    userArticles: []
  };
  render() {
    const { user } = this.props;
    const { articles, userArticles } = this.state;
    const threeUserArtile = userArticles.slice(0, 3);
    return (
      <div className="topGrid">
        <div>
          <h1 className="page-title">Welcome back to NC-News</h1>
        </div>
        <div className="recentArticles">
          <h4>{`${user}`}'s most recent articles</h4>
          {threeUserArtile.map(article => {
            return (
              <React.Fragment key={article.article_id}>
                <p>
                  Title : {article.title}
                  <br /> Topic : {article.topic}
                </p>
                <Link to={`/articles/${article.article_id}`}>
                  View your article
                </Link>
              </React.Fragment>
            );
          })}
        </div>
        <div>
          <h4>
            Hey {`${user}`} people seem to love your articles.
            <br />
            Want to add another one? Just click the link below
          </h4>
          <Link to="/articles/new_article">Write a new article</Link>
        </div>
        <div>
          <h3>Most Popular Artilces</h3>
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
    this.fetchArticles();
    this.fetchUserArticles();
  }

  fetchUserArticles = () => {
    axios
      .get("https://nc-knews777.herokuapp.com/api/articles?limit=100")
      .then(({ data }) => {
        const userArticles = data.articles.filter(article => {
          return article.author === this.props.user;
        });
        this.setState({
          userArticles
        });
      });
  };

  fetchArticles = () => {
    axios
      .get(
        "https://nc-knews777.herokuapp.com/api/articles?limit=5&&sort_by=votes"
      )
      .then(({ data }) => {
        this.setState({
          articles: data.articles
        });
      });
  };
}

export default Home;
