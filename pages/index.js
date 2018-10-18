import { Header, Loader, Dimmer } from "semantic-ui-react";
import React, { Component } from "react";
import ShopContainer from "../components/shop/ShopContainer";
//import { connect } from "react-redux";
import axios from "axios";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  static async getInitialProps() {
    const response = await axios.get("http://localhost:5000/api/shop");
    if (response && response.data) {
      return { items: response.data.items };
    } else {
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
