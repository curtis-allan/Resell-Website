import React, { Component } from "react";
import ShopContainer from "../components/shop/ShopContainer";
import axios from "axios";

export default class Shop extends Component {
  static async getInitialProps() {
    let pageProps = {};
    const res = await axios.get("http://localhost:5000/api/shop");
    if (res && res.data) {
      pageProps.items = res.data.items;
      return { pageProps };
    }
  }

  render() {
    return (
      <>
        <ShopContainer items={this.props.items} form />
      </>
    );
  }
}
