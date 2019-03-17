import React, { Component } from "react";
import axios from "axios";

class Comments extends Component {
  state = {
    comment: {},
    commentModifier: 0
  };

  render() {
    const { comment, commentModifier } = this.state;
    const isAuthor =
      this.props.user === ((comment && comment.author) || comment.username)
        ? true
        : false;
    return (
      <div className="commentContainer">
        <p>
          {comment.author || comment.username} on{" "}
          {comment.created_at && comment.created_at.substring(0, 10)}
          <br /> <br />'{comment.body}'
        </p>
        <p>Comment Votes : {comment.votes + commentModifier}</p>
        <div>
          {!isAuthor && (
            <button
              disabled={commentModifier === 1}
              className="likeButton"
              type="button"
              onClick={() =>
                this.voteToComment(
                  comment.comment_id,
                  commentModifier === -1 ? 2 : 1
                )
              }
            >
              Like
            </button>
          )}
          {!isAuthor && (
            <button
              disabled={commentModifier === -1}
              className="dislikeButton"
              type="button"
              onClick={() =>
                this.voteToComment(
                  comment.comment_id,
                  commentModifier === 1 ? -2 : -1
                )
              }
            >
              Dislike
            </button>
          )}
          {isAuthor && (
            <button
              className="deleteButton"
              type="button"
              onClick={this.deleteComment}
            >
              Delete Comment
            </button>
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      comment: this.props.comment
    });
  }

  voteToComment = (comm_id, num) => {
    const { id } = this.props;
    const add = { inc_votes: num };
    axios
      .patch(
        `https://nc-knews777.herokuapp.com/api/articles/${id}/comments/${comm_id}`,
        add
      )
      .then(({ data }) => {
        this.setState({
          commentModifier: this.state.commentModifier + num
        });
      });
  };
  deleteComment = e => {
    const { id } = this.props;
    const comm_id = this.state.comment.comment_id;
    axios
      .delete(
        `https://nc-knews777.herokuapp.com/api/articles/${id}/comments/${comm_id}`
      )
      .then(() => this.props.handleCommentDelete(comm_id));
    // .then(() => this.props.commentFunc());
  };
}

export default Comments;
