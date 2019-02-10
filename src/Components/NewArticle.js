import React, { Component } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

class NewArticle extends Component {
  state = {
    topics: [],
    selectedTopic: "",
    newSlugInput: "",
    newDescriptionInput: "",
    newArticleTitle: "",
    newArticleBody: ""
  };

  render() {
    const {
      topics,
      newSlugInput,
      newDescriptionInput,
      newArticleBody,
      newArticleTitle
    } = this.state;
    return (
      <div key={"newArticlePage"}>
        <div>
          <button type="button" onClick={() => this.props.logoutFunc()}>
            Logout
          </button>
        </div>
        <h1>Write a new Article</h1>
        <div key={"addNewArticle"}>
          <p>First choose the topic of your new article</p>
          <select onChange={this.topicChange}>
            <option selected disabled key={"disabled"} value={null}>
              Choose topic
            </option>
            {topics &&
              topics.map(topic => {
                return (
                  <option key={topic.slug} value={topic.slug}>
                    {topic.slug}
                  </option>
                );
              })}
          </select>
          <p>
            {`(psst if you wish to add an article to a topic that does not yet exist you can add a new topic using the form at the bottom of the page)`}
          </p>
          <form onSubmit={this.postNewArticle}>
            <input
              required
              placeholder="article title"
              type="text"
              onChange={this.handleChange}
              value={newArticleTitle}
              id={"newArticleTitle"}
            />
            <input
              required
              placeholder="article body"
              type="text"
              onChange={this.handleChange}
              value={newArticleBody}
              id={"newArticleBody"}
            />
            <button type="submit">Submit new article</button>
            {/* {'finish this form for the article!'} */}
          </form>
        </div>
        <p>
          {" "}
          If you wish to add a new topic please enter title and description then
          submit
        </p>
        <form onSubmit={this.addTopic}>
          <input
            placeholder="New Topic Title"
            type="text"
            required
            onChange={this.handleChange}
            value={newSlugInput}
            id={"newSlugInput"}
          />
          <input
            required
            placeholder="New Topic Description"
            type="text"
            onChange={this.handleChange}
            value={newDescriptionInput}
            id={"newDescriptionInput"}
          />
          <button type="submit">Submit new topic</button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    const key = event.target.id;
    const input = event.target.value;
    this.setState({
      [key]: input
    });
  };

  addTopic = e => {
    e.preventDefault();
    const { newSlugInput, newDescriptionInput } = this.state;
    const newTopic = {
      description: newDescriptionInput,
      slug: newSlugInput.toLowerCase()
    };
    if (!newSlugInput || !newDescriptionInput) {
      alert(
        "Please insure you have inserted a new topic title and description before submitting, thank you"
      );
    } else {
      axios
        .post("https://nc-knews777.herokuapp.com/api/topics", newTopic)
        .then(({ data }) => {
          this.setState({
            topics: [data.topic, ...this.state.topics],
            newSlugInput: "",
            newDescriptionInput: ""
          });
        });
    }
  };

  topicChange = e => {
    const topicChosen = e.target.value;
    this.setState({
      selectedTopic: topicChosen
    });
  };

  postNewArticle = e => {
    e.preventDefault();
    const { newArticleBody, newArticleTitle, selectedTopic } = this.state;
    const username = this.props.user;
    const body = { body: newArticleBody, title: newArticleTitle, username };
    if (!newArticleBody || !newArticleTitle || !selectedTopic) {
      alert(
        "Please insure you have picked a topic for your new article, thank you"
      );
    } else {
      axios
        .post(
          `https://nc-knews777.herokuapp.com/api/topics/${selectedTopic}/articles`,
          body
        )
        .then(() => navigate("/articles"));
    }
  };

  componentDidMount() {
    this.getTopics();
  }

  getTopics = () => {
    axios
      .get("https://nc-knews777.herokuapp.com/api/topics")
      .then(({ data }) => {
        this.setState({
          topics: data.topics
        });
      });
  };
}

export default NewArticle;
