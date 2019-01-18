import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { string } from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import { Button, createStyles } from "@material-ui/core";

const spinner = require("./images/ajax-loader.gif");

const axios = require("axios");

import Image from "./components/Image";

interface IProps {
  message: string;
}

interface IState {
  user: string;
  repos: Array<any>;
  avatar_url: string;
}

class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: "",
      repos: [],
      avatar_url: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: any) {
    this.setState({ user: e.target.value });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.user}/repos`)
      .then((response: any) => {
        this.setState({
          user: this.state.user,
          repos: response.data,
          avatar_url: response.data[0].owner.avatar_url
        });
      });
  }

  public render() {
    let repos = this.state.repos;

    let processData = repos.map(data => {
      return (
        <div>
          <h4>
            Repo: <em>{data.name}</em>
          </h4>
          <ul key={data.id} className="mb-3">
            <li>Language: {data.language}</li>
            <li>URL: {data.html_url}</li>
            <li>Created at: {data.created_at}</li>
          </ul>
        </div>
      );
    });

    return (
      <div>
        <Grid className="container">
          <h2>{this.props.message}</h2>
          <br />
          <h3 className="mb-3">Get Github user info</h3>
          <form onSubmit={this.handleSubmit} className="mt-3">
            <label>user:</label>
            <input
              type="text"
              value={this.state.user}
              onChange={this.handleChange}
              name="inputField"
            />

            <input type="submit" value="Submit" />
          </form>
          <Image url={this.state.avatar_url} />
          {processData}
          <div />
        </Grid>
      </div>
    );
  }
}

export default App;
