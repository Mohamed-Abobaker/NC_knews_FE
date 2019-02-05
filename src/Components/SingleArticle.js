import React, { Component } from "react";
import axios from "axios";

class SingleArticle extends Component {
  state = {
    article: null,
    votes: null,
    comments: null,
    test: null
  };
  render() {
    const { article, votes, comments } = this.state;
    return (
      <div>
        <div>
          <h1>{article && article.title}</h1>
          <p>{article && article.body}</p>
          <p>
            {article && article.author} ------ posted on{" "}
            {article && article.created_at.substring(0, 10)}
          </p>
        </div>
        <div>
          <p>Article Votes: {votes && votes}</p>
          <button type="button" onClick={this.likeToArticle}>
            Like
          </button>
          <button type="button" onClick={this.dislikeToArticle}>
            Dislike
          </button>
        </div>
        <div>
          <h3>Comments</h3>
          {comments &&
            comments.map(comment => {
              return (
                <div key={comment.created_at}>
                  <p>
                    {comment.created_at.substring(0, 10)} ----- {comment.author}{" "}
                    commented :<br />'{comment.body}'
                  </p>
                  <p>Comment Votes : {comment.votes}</p>
                  <button
                    type="button"
                    onClick={() => this.likeComment(comment.comment_id)}
                  >
                    Like
                  </button>
                  <button
                    type="button"
                    onClick={() => this.dislikeComment(comment.comment_id)}
                  >
                    Dislike
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getArticle();
    this.getComments();
  }

  getArticle = () => {
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

  getComments = () => {
    const { id } = this.props;
    axios
      .get(`https://nc-knews777.herokuapp.com/api/articles/${id}/comments`)
      .then(({ data }) => {
        this.setState({
          comments: data.comments
        });
      });
  };

  likeToArticle = () => {
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

  dislikeToArticle = () => {
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

  likeComment = comm_id => {
    const { id } = this.props;
    const add = { inc_votes: 1 };
    axios
      .patch(
        `https://nc-knews777.herokuapp.com/api/articles/${id}/comments/${comm_id}`,
        add
      )
      .then(({ data }) => {
        console.log("data", data);
        this.setState({
          test: data
        });
      });
  };

  dislikeComment = comm_id => {
    const { id } = this.props;
    const add = { inc_votes: -1 };
    axios
      .patch(
        `https://nc-knews777.herokuapp.com/api/articles/${id}/comments/${comm_id}`,
        add
      )
      .then(({ data }) => {
        console.log("data", data);
        this.setState({
          test: data
        });
      });
  };
}

export default SingleArticle;
