import React, { Component } from "react";
import axios from "axios";

class NewArticle extends Component {
  state = {
    topics: [],
    newSlugInput: "",
    selectedTopic: "",
    newDescriptionInput: ""
  };
  render() {
    const { topics, newSlugInput, newDescriptionInput } = this.state;
    return (
      <div>
        <h1>Write a new Article</h1>
        <div>
          <label>
            Choose the topic of your new article
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
          </label>
        </div>
        <p> If you wish to add a new topic please sumbit here</p>
        <form onSubmit={this.addTopic}>
          <input
            placeholder="New Topic Title"
            type="text"
            onChange={this.handleSlugChange}
            value={newSlugInput}
          />
          <input
            placeholder="New Topic Description"
            type="text"
            onChange={this.handleDescriptionChange}
            value={newDescriptionInput}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  handleSlugChange = e => {
    const input = e.target.value;
    this.setState({
      newSlugInput: input
    });
  };

  handleDescriptionChange = e => {
    const input = e.target.value;
    this.setState({
      newDescriptionInput: input
    });
  };

  addTopic = e => {
    e.preventDefault();
    const { newSlugInput, newDescriptionInput } = this.state;
    const newTopic = {
      description: newDescriptionInput,
      slug: newSlugInput
    };
    axios
      .post("https://nc-knews777.herokuapp.com/api/topics", newTopic)
      .then(console.log);
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
