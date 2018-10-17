import Layout from "../components/Layout";
import { Header } from "semantic-ui-react";
import React, { Component } from "react";
import { connect } from "react-redux";
import "isomorphic-unfetch";

class Index extends Component {
  static async getInitialProps() {
    const res = await fetch("http://localhost:5000/api/shop");
    const json = await res.json();
    return { ShopItems: json.ShopItems };
  }
  render() {
    return (
      <Layout>
        <Header as="h1">Hello, this is the main application.</Header>
        <p>There are {this.props.ShopItems} stars</p>
      </Layout>
    );
  }
}

export default Index;
