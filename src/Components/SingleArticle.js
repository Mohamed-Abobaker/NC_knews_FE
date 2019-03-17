import React, { Component } from "react";
import axios from "axios";
import Comments from "./Comments";
import { navigate } from "@reach/router";
import ArticleNotFound from "./ArticleNotFound";
import "../Style/SingleArticle.css";
import "../App.css";
import { BarLoader } from "react-css-loaders";

class SingleArticle extends Component {
  state = {
    article: null,
    votesModifier: 0,
    comments: [],
    newComment: "",
    hasError: false,
    loading: true,
    loadingComment: true,
    showComments: false
  };
  render() {
    const {
      article,
      votesModifier,
      comments,
      newComment,
      hasError,
      loading,
      loadingComment,
      showComments
    } = this.state;

    const isUser =
      this.props.user === (article && article.author) ? true : false;

    if (hasError) return <ArticleNotFound />;

    return loading ? (
      <BarLoader />
    ) : (
      <div className="topGrid">
        <h1 className="page-title">{article && article.title}</h1>
        <div className="articleContainer">
          <p>{article && article.body}</p>
          <p>
            Posted by: '{article && article.author}' &nbsp;
            <br />
            {article && article.created_at.substring(0, 10)}
          </p>
          {/* </div>
        <div className="articleContainer"> */}
          <p>Article Votes: {article && article.votes + votesModifier}</p>
          {!isUser && (
            <button
              className="likeButton"
              disabled={votesModifier === 1}
              type="button"
              onClick={() => this.voteToArticle(votesModifier === -1 ? 2 : 1)}
            >
              Like
            </button>
          )}
          {!isUser && (
            <button
              className="dislikeButton"
              disabled={votesModifier === -1}
              type="button"
              onClick={() => this.voteToArticle(votesModifier === 1 ? -2 : -1)}
            >
              Dislike
            </button>
          )}
          {isUser && (
            <button
              className="deleteButton"
              type="button"
              onClick={this.deleteArticle}
            >
              Delete Article
            </button>
          )}
        </div>
        <div>
          <br />
          <button
            className="myFont"
            type="button"
            onClick={() =>
              this.setState({ showComments: !this.state.showComments })
            }
          >
            {showComments ? "Hide Comments" : "Show Comments"}
          </button>
          {showComments && (
            <div className="containerTitle">
              <h3>Comments</h3>
              <form onSubmit={this.postNewComment}>
                <input
                  required
                  onChange={this.handleChange}
                  type="text"
                  value={newComment}
                />
                <button className="myFont" type="sumbit">
                  submit comment
                </button>
              </form>
            </div>
          )}

          {showComments &&
            comments &&
            comments.map(comment => {
              return loadingComment ? (
                <BarLoader />
              ) : (
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
          article: data.article,
          loading: false
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
          comments: data.comments,
          loadingComment: false
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
