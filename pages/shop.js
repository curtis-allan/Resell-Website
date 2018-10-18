import React, { Component } from "react";
import ShopContainer from "../components/shop/ShopContainer";
import axios from "axios";

export default class Shop extends Component {
  static async getInitialProps() {
    await new Promise(resolve => {
      setTimeout(resolve, 500);
    });
    const response = await axios.get("http://localhost:5000/api/shop");
    if (response && response.data) {
      return { items: response.data.items };
    } else {
      return {};
    }
  }

  render() {
    return <ShopContainer items={this.props.items} form />;
  }
}
