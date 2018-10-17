import Layout from "../components/Layout";
import { Header } from "semantic-ui-react";
import React, { Component } from "react";
import { connect } from "react-redux";
import "isomorphic-unfetch";

export default class extends Component {
  static async getInitialProps() {
    const res = await fetch("http://localhost:5000/api/stars");
    const json = await res.json();
    return { stars: json.stars };
  }
  render() {
    return (
      <Layout>
        <Header as="h1">Hello, this is the about page.</Header>
        <p>There are {this.props.stars} stars</p>
      </Layout>
    );
  }
}
