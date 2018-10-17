import Layout from "../components/Layout";
import React, { Component } from "react";
import { connect } from "react-redux";
import "isomorphic-unfetch";

class Index extends Component {
  static async getInitialProps() {
    const res = await fetch("http://localhost:5000/api/stars");
    const json = await res.json();
    return { stars: json.stars };
  }
  render() {
    return (
      <Layout>
        <h1>Hello, this is the main application.</h1>
        <p>There are {this.props.stars} stars</p>
      </Layout>
    );
  }
}
export default Index;
