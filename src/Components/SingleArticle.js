import React, { Component } from "react";
import axios from "axios";
import Comments from "./Comments";
import { navigate } from "@reach/router";

class SingleArticle extends Component {
  state = {
    article: null,
    votesModifier: 0,
    comments: [],
    newComment: ""
  };
  render() {
    const { article, votesModifier, comments, newComment } = this.state;
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
          <p>Article Votes: {article && article.votes + votesModifier}</p>
          <button
            disabled={votesModifier === 1}
            type="button"
            onClick={() => this.voteToArticle(1)}
          >
            Like
          </button>
          <button
            disabled={votesModifier === -1}
            type="button"
            onClick={() => this.voteToArticle(-1)}
          >
            Dislike
          </button>
          <button type="button" onClick={this.deleteArticle}>
            Delete Article
          </button>
        </div>
        <div>
          <h3>Comments</h3>
          <form onSubmit={this.postNewComment}>
            <input
              onChange={this.handleChange}
              type="text"
              value={newComment}
            />
            <button type="sumbit">submit comment</button>
          </form>
          {comments &&
            comments.map(comment => {
              return (
                <Comments
                  key={comment.comment_id}
                  id={article && article.article_id}
                  comment={comment}
                />
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

  voteToArticle = vote => {
    const { id } = this.props;
    const add = { inc_votes: vote };
    axios
      .patch(`https://nc-knews777.herokuapp.com/api/articles/${id}`, add)
      .then(({ data }) => {
        this.setState({
          votesModifier: this.state.votesModifier + vote
        });
      });
  };

  handleChange = e => {
    this.setState({
      newComment: e.target.value
    });
  };

  postNewComment = e => {
    e.preventDefault();
    const { id } = this.props;
    const { newComment } = this.state;
    const username = "grumpy19";
    const body = { body: newComment, username };
    if (newComment) {
      axios
        .post(
          `https://nc-knews777.herokuapp.com/api/articles/${id}/comments`,
          body
        )
        .then(({ data }) => {
          this.setState({
            comments: [data.comment, ...this.state.comments],
            newComment: ""
          });
        });
    }
  };
  deleteArticle = () => {
    console.log("deleteArticle");
    const { id } = this.props;
    axios
      .delete(`https://nc-knews777.herokuapp.com/api/articles/${id}`)
      .then(() => navigate("/articles"));
  };
}

export default SingleArticle;
