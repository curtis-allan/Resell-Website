import { Header } from "semantic-ui-react";
import React, { Component } from "react";
import ShopContainer from "../components/shop/ShopContainer";
//import { connect } from "react-redux";
import NextAuth from "next-auth";

class Index extends Component {
  static async getInitialProps({ req }) {
    return {
      session: await NextAuth.init({ req })
    };
  }

  render() {
    if (this.props.session.user) {
      return (
        <div>
          <p>
            You are logged in as{" "}
            {this.props.session.user.name || this.props.session.user.email}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p>You are not logged in.</p>
        </div>
      );
    }
  }
}
export default Index;
