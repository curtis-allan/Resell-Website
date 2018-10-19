import { Header } from "semantic-ui-react";
import React, { Component } from "react";
import ShopContainer from "../components/shop/ShopContainer";
//import { connect } from "react-redux";
import axios from "axios";

class Index extends Component {
  static async getInitialProps() {
    let pageProps = {};
    const res = await axios.get("http://localhost:5000/api/shop");
    if (res && res.data) {
      pageProps.items = res.data.items;
      return { pageProps };
    } else {
      console.log("NO RESPONSE FROM API");
      return {};
    }
  }

  render() {
    return (
      <>
        <Header as="h1">Hello, this is the main application.</Header>
        <ShopContainer items={this.props.items} />
      </>
    );
  }
}

export default Index;
