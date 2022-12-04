import React from "react";

class PresentationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      presenterName: "",
      presenterEmail: "",
      companyName: "",
      title: "",
      synopsis: "",
      conference: "",
      conferences: [],
    };
    this.handlePresenterNameChange = this.handlePresenterNameChange.bind(this);
    this.handlePresenterEmailChange = this.handlePresenterEmailChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSynopsisChange = this.handleSynopsisChange.bind(this);
    this.handleConferenceChange = this.handleConferenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.presenter_name = data.presenterName;
    data.presenter_email = data.presenterEmail;
    data.company_name = data.companyName;
    delete data.presenterName;
    delete data.presenterEmail;
    delete data.companyName;
    delete data.conferences;
    console.log(data);
    const conferenceUrl = `http://localhost:8000/api/conferences/${data.conference}/presentations/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
      const newConference = await response.json();
      console.log(newConference);

      const cleared = {
        presenterName: "",
        presenterEmail: "",
        companyName: "",
        title: "",
        synopsis: "",
        conference: "",
      };
      this.setState(cleared);
    }
  }

  handlePresenterNameChange(event) {
    const value = event.target.value;
    this.setState({ presenterName: value });
  }

  handlePresenterEmailChange(event) {
    const value = event.target.value;
    this.setState({ presenterEmail: value });
  }

  handleCompanyNameChange(event) {
    const value = event.target.value;
    this.setState({ companyName: value });
  }

  handleTitleChange(event) {
    const value = event.target.value;
    this.setState({ title: value });
  }

  handleSynopsisChange(event) {
    const value = event.target.value;
    this.setState({ synopsis: value });
  }

  handleConferenceChange(event) {
    const value = event.target.value;
    this.setState({ conference: value });
  }

  async componentDidMount() {
    const url = "http://localhost:8000/api/conferences/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ conferences: data.conferences });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={this.handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handlePresenterNameChange}
                  value={this.state.presenterName}
                  placeholder="Presenter name"
                  required
                  type="text"
                  name="presenter_name"
                  id="presenter_name"
                  className="form-control"
                />
                <label htmlFor="name">Presenter name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={this.handlePresenterEmailChange}
                  value={this.state.presenterEmail}
                  placeholder="Presenter email"
                  required
                  type="email"
                  name="presenter_email"
                  id="presenter_email"
                  className="form-control"
                />
                <label htmlFor="name">Presenter email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={this.handleCompanyNameChange}
                  value={this.state.companyName}
                  placeholder="Company name"
                  type="text"
                  name="company_name"
                  id="company_name"
                  className="form-control"
                />
                <label htmlFor="name">Company name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={this.handleTitleChange}
                  value={this.state.title}
                  placeholder="Title"
                  required
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                />
                <label htmlFor="name">Title</label>
              </div>

              <div className="mb-3">
                <label htmlFor="synopsis" className="form-label">
                  Synopsis
                </label>
                <textarea
                  onChange={this.handleSynopsisChange}
                  value={this.state.synopsis}
                  placeholder="Enter synopsis..."
                  required
                  className="form-control"
                  name="synopsis"
                  id="synopsis"
                  rows="4"
                ></textarea>
              </div>

              <div className="mb-3">
                <select
                  onChange={this.handleConferenceChange}
                  value={this.state.conference}
                  required
                  name="conference"
                  id="conference"
                  className="form-select"
                >
                  <option value="">Choose a conference</option>
                  {this.state.conferences.map((conference) => {
                    return (
                      <option key={conference.id} value={conference.id}>
                        {conference.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PresentationForm;
