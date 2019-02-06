import React, { Component } from "react";
import axios from "axios";
import Comments from "./Comments";

class SingleArticle extends Component {
  state = {
    article: null,
    votesModifier: 0
  };
  render() {
    const { article, votesModifier, comments } = this.state;
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
        </div>
        <div>
          <h3>Comments</h3>
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
}

export default SingleArticle;
