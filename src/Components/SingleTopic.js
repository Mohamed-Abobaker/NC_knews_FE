import React, { Component } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import { BarLoader } from "react-css-loaders";

class SingleTopic extends Component {
  state = {
    articles: [],
    loading: true
  };
  render() {
    const { articles, loading } = this.state;
    return (
      <div className="topGrid">
        <h1 className="page-title">{this.props.slug}</h1>
        <div className="container">
          <div className="containerTitle">
            <h4 className="subHeadings">
              Number of Articles : {articles.length}
            </h4>
          </div>
          {articles.map(article => {
            return loading ? (
              <BarLoader />
            ) : (
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
          articles: data.articles,
          loading: false
        });
      });
  };
}

export default SingleTopic;
