import Layout from "../components/Layout";
import React, { Component } from "react";
import ShopContainer from "../components/shop/ShopContainer";
import { Segment } from "semantic-ui-react";
import Router from "next/router";

export default class Shop extends Component {
  render() {
    return (
      <Layout>
        <Segment vertical>
          <ShopContainer />
        </Segment>
      </Layout>
    );
  }
}
