import Layout from "../components/Layout";
import React from "react";
import ShopContainer from "../components/shop/ShopContainer";
import Head from "next/head";
import { Segment } from "semantic-ui-react";

const shop = () => (
  <Layout>
    <Segment vertical>
      <ShopContainer />
    </Segment>
  </Layout>
);

export default shop;
