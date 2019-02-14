import React, { Component } from "react";
import axios from "axios";
import { Link } from "@reach/router";

class SingleTopic extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    return (
      <div className="topGrid">
        <h1 className="page-title">{this.props.slug}</h1>
        <div className="container">
          <h4>Number of Articles : {articles.length}</h4>
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
  }

  getArticles = () => {
    axios
      .get(
        `https://nc-knews777.herokuapp.com/api/topics/${
          this.props.slug
        }/articles?limit=1000000`
      )
      .then(({ data }) => {
        this.setState({
          articles: data.articles
        });
      });
  };
}

export default SingleTopic;
