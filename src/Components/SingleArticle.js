import React, { Component } from "react";
import axios from "axios";
import Comments from "./Comments";
import { navigate } from "@reach/router";
import ArticleNotFound from "./ArticleNotFound";
import "../Style/SingleArticle.css";
import "../App.css";

class SingleArticle extends Component {
  state = {
    article: null,
    votesModifier: 0,
    comments: [],
    newComment: "",
    hasError: false
  };
  render() {
    const {
      article,
      votesModifier,
      comments,
      newComment,
      hasError
    } = this.state;

    const isUser =
      this.props.user === (article && article.author) ? true : false;

    if (hasError) return <ArticleNotFound />;

    return (
      <div className="topGrid">
        <h1 className="page-title">{article && article.title}</h1>
        <div className="container">
          <p>{article && article.body}</p>
          <p>
            '{article && article.author}' posted on{" "}
            {article && article.created_at.substring(0, 10)}
          </p>
        </div>
        <div className="container">
          <p>Article Votes: {article && article.votes + votesModifier}</p>
          <button
            disabled={votesModifier === 1}
            type="button"
            onClick={() => this.voteToArticle(votesModifier === -1 ? 2 : 1)}
          >
            Like
          </button>
          <button
            disabled={votesModifier === -1}
            type="button"
            onClick={() => this.voteToArticle(votesModifier === 1 ? -2 : -1)}
          >
            Dislike
          </button>
          {isUser && (
            <button type="button" onClick={this.deleteArticle}>
              Delete Article
            </button>
          )}
        </div>
        <div className="container">
          <h3>Comments</h3>
          <form onSubmit={this.postNewComment}>
            <input
              required
              onChange={this.handleChange}
              type="text"
              value={newComment}
            />
            <button type="sumbit">submit new comment</button>
          </form>
          {comments &&
            comments.map(comment => {
              return (
                <Comments
                  user={this.props.user}
                  key={comment.comment_id}
                  id={article && article.article_id}
                  comment={comment}
                  commentFunc={this.getComments}
                  handleCommentDelete={this.handleCommentDelete}
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
      })
      .catch(err => {
        this.setState({
          hasError: true
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
    const username = this.props.user;
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
    const { id } = this.props;
    axios
      .delete(`https://nc-knews777.herokuapp.com/api/articles/${id}`)
      .then(() => navigate("/articles"));
  };

  handleCommentDelete = id => {
    const filteredComments = this.state.comments.filter(comment => {
      return comment.comment_id !== id;
    });
    this.setState({
      comments: filteredComments
    });
  };
}

export default SingleArticle;
