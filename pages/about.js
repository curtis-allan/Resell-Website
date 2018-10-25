import { Header } from "semantic-ui-react";
import React, { Component } from "react";
import { connect } from "react-redux";

export default class extends Component {
  render() {
    return (
      <>
        <Header as="h1">Hello, this is the about page.</Header>
      </>
    );
  }
}
