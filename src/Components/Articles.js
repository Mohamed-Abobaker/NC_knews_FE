import React, { Component } from "react";
import axios from "axios";
import { Link } from "@reach/router";

class Articles extends Component {
  state = {
    articles: []
  };

  render() {
    const { articles } = this.state;
    console.log(articles);
    return (
      <div>
        <h1>Articles</h1>
        {articles.map(article => {
          return (
            <p>
              Title : {article.title}
              <br /> Author : {article.author}
              <br />{" "}
            </p>
            // <Link to = {`/articles/${article.article_id}`} >View Article</Link>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    axios
      .get("https://nc-knews777.herokuapp.com/api/articles")
      .then(({ data }) => {
        this.setState({
          articles: data.articles
        });
      });
  };
}

export default Articles;
