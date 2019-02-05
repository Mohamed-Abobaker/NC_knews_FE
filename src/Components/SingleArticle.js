import React, { Component } from "react";
import axios from "axios";

class SingleArticle extends Component {
  state = {
    article: null,
    votes: null
  };
  render() {
    const { article, votes } = this.state;
    return (
      <div>
        <h1>{article && article.title}</h1>
        <p>{article && article.body}</p>
        {"\n\n\n"}
        <p>
          By {article && article.author} ---{" "}
          {article && article.created_at.substring(0, 10)}
        </p>
        <div>
          <p>Article Votes: {votes && votes}</p>
          <button type="button" onClick={this.addLike}>
            Like
          </button>
          <button type="button" onClick={this.dislike}>
            Dislike
          </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getarticle();
  }

  getarticle = () => {
    const { id } = this.props;
    axios
      .get(`https://nc-knews777.herokuapp.com/api/articles/${id}`)
      .then(({ data }) => {
        this.setState({
          votes: data.article.votes,
          article: data.article
        });
      });
  };

  addLike = () => {
    const { id } = this.props;
    const add = { inc_votes: 1 };
    axios
      .patch(`https://nc-knews777.herokuapp.com/api/articles/${id}`, add)
      .then(({ data }) => {
        this.setState({
          votes: data.article.votes
        });
      });
  };

  dislike = () => {
    const { id } = this.props;
    const minus = { inc_votes: -1 };
    axios
      .patch(`https://nc-knews777.herokuapp.com/api/articles/${id}`, minus)
      .then(({ data }) => {
        this.setState({
          votes: data.article.votes
        });
      });
  };
}

export default SingleArticle;
