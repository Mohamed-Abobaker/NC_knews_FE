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
      <div>
        <h1>{this.props.slug}</h1>
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
