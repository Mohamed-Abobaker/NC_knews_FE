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
        <div className="container">
          <h3>{`${user}`}'s most recent articles</h3>
          {threeUserArtile.map(article => {
            return (
              <div className="tcontainer" key={article.article_id}>
                <p>
                  <Link to={`/articles/${article.article_id}`}>
                    {article.title}
                  </Link>{" "}
                  <br />
                  {article && article.created_at.substring(0, 10)}
                  <br />
                  Topic : {article.topic}
                </p>
              </div>
            );
          })}
        </div>
        <div className="container">
          <h4>
            Hey {`${user}`} people seem to love your articles.
            <br />
            <Link to="/articles/new_article">Want to add another one?</Link>
          </h4>
        </div>
        <div className="container">
          <h3>Most Popular Artilces</h3>
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
