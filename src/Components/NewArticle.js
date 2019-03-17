import React, { Component } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { BarLoader } from "react-css-loaders";

class NewArticle extends Component {
  state = {
    topics: [],
    selectedTopic: "coding",
    newSlugInput: "",
    newDescriptionInput: "",
    newArticleTitle: "",
    newArticleBody: "",
    loading: true,
    newTopic: false,
    topicIsAdded: false
  };

  render() {
    const {
      topics,
      newSlugInput,
      newDescriptionInput,
      newArticleBody,
      newArticleTitle,
      loading,
      newTopic,
      topicIsAdded
    } = this.state;
    return loading ? (
      <BarLoader />
    ) : (
      <div key={"newArticlePage"} className="newArticle">
        <h1 className="page-title">Add a new Article</h1>
        <div key={"addNewArticle"} className="newArticleTopicSelect">
          <label>
            Topic:
            <select onChange={this.topicChange}>
              <option defaultValue disabled key={"disabled"} value={null}>
                Choose topic
              </option>
              {topics &&
                topics.map(topic => {
                  return (
                    <option key={topic.slug} value={topic.slug}>
                      {topic.slug.toUpperCase()}
                    </option>
                  );
                })}
            </select>
          </label>
          <p>
            {`(psst if you wish to add an article to a topic that does not yet exist you can add a new topic using the form at the bottom of the page)`}
          </p>
          <br />
          <form onSubmit={this.postNewArticle}>
            <input
              className="newArticleTitleInput"
              required
              placeholder="ARTICLE TITLE"
              type="text"
              onChange={this.handleChange}
              value={newArticleTitle}
              id={"newArticleTitle"}
            />
            <br />
            <textarea
              className="newArticleBodyInput"
              required
              placeholder="ARTICLE BODY"
              type="text"
              onChange={this.handleChange}
              value={newArticleBody}
              id={"newArticleBody"}
            />
            <br />
            <br />
            <button className="myFont" type="submit">
              Submit new article
            </button>
            {/* {'finish this form for the article!'} */}
          </form>

          <br />
          <br />
          <button
            className="myFont"
            type="button"
            onClick={() => this.setState({ newTopic: !this.state.newTopic })}
          >
            {newTopic ? "Cancel" : "Add Topic"}
          </button>
          {newTopic && (
            <div className="newArticleTopicSelect">
              new topic
              <form onSubmit={this.addTopic}>
                <input
                  className="newArticleTitleInput"
                  placeholder="TOPIC TITLE"
                  type="text"
                  required
                  onChange={this.handleChange}
                  value={newSlugInput}
                  id={"newSlugInput"}
                />
                <br />

                <textarea
                  className="newArticleBodyInput"
                  required
                  placeholder="TOPIC DESCRIPTION"
                  type="text"
                  onChange={this.handleChange}
                  value={newDescriptionInput}
                  id={"newDescriptionInput"}
                />
                <br />
                <br />
                {topicIsAdded && <p>New topic successfully added</p>}
                <button type="submit">Submit new topic</button>
              </form>
            </div>
          )}
        </div>
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
            newDescriptionInput: "",
            topicIsAdded: true
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
          topics: data.topics,
          loading: false
        });
      });
  };
}

export default NewArticle;
