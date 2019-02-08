import React, { Component } from "react";
import axios from "axios";

class Comments extends Component {
  state = {
    comment: this.props.comment,
    commentModifier: 0
  };

  render() {
    const { comment, commentModifier } = this.state;
    return (
      <div>
        <p>
          {comment.created_at.substring(0, 10)} ----- {comment.author} commented
          :<br />'{comment.body}'
        </p>
        <p>Comment Votes : {comment.votes + commentModifier}</p>
        <button
          disabled={commentModifier === 1}
          type="button"
          onClick={() => this.voteToComment(comment.comment_id, 1)}
        >
          Like
        </button>
        <button
          disabled={commentModifier === -1}
          type="button"
          onClick={() => this.voteToComment(comment.comment_id, -1)}
        >
          Dislike
        </button>
        <button type="button" onClick={this.deleteComment}>
          Delete Comment
        </button>
      </div>
    );
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
    console.log("here");
    const { id } = this.props;
    const comm_id = this.state.comment.comment_id;
    axios
      .delete(
        `https://nc-knews777.herokuapp.com/api/articles/${id}/comments/${comm_id}`
      )
      .then(() => this.props.commentFunc());
  };
}

export default Comments;
