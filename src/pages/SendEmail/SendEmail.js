import React, { Component } from "react";

export default class FeedbackForm extends Component {
  state = {
    receiverEmail: "",
    template: "",
    user: "",
    feedback: "",
    formSubmitted: false,
  };

  handleCancel = this.handleCancel.bind(this);
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  static sender = "sender@example.com";

  handleCancel() {
    this.setState({
      feedback: "",
    });
  }

  handleChange(event) {
    this.setState({
      feedback: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.sendFeedback(
      this.template,
      this.sender,
      this.receiverEmail,
      this.state.feedback,
      this.user
    );

    this.setState({
      formSubmitted: true,
    });
  }

  // Note: this is using default_service, which will map to whatever
  // default email provider you've set in your EmailJS account.
  sendFeedback(templateId, senderEmail, receiverEmail, feedback, user) {
    window.emailjs
      .send(
        "default_service",
        templateId,
        {
          senderEmail,
          receiverEmail,
          feedback,
        },
        user
      )
      .then((res) => {
        this.setState({
          formEmailSent: true,
        });
      })
      // Handle errors here however you like
      .catch((err) => console.error("Failed to send feedback. Error: ", err));
  }

  render() {
    return (
      <form className="feedback-form" onSubmit={this.handleSubmit}>
        <h1>Your Feedback</h1>
        <textarea
          className="text-input"
          id="feedback-entry"
          name="feedback-entry"
          onChange={this.handleChange}
          placeholder="Enter your feedback here"
          required
          value={this.state.feedback}
        />
        <div className="btn-group">
          <button className="btn btn--cancel" onClick={this.handleCancel}>
            Cancel
          </button>
          <input type="submit" value="Submit" className="btn btn--submit" />
        </div>
      </form>
    );
  }
}
