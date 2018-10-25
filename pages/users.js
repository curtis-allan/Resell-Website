import React, { Component } from "react";
import axios from "axios";
import Router from "next/router";

class Users extends Component {
  static async getInitialProps({ query }) {
    const id = query;
    return { id };
  }
  state = {};
  render() {
    return (
      <div>
        <h1>
          USERNAME:
          {this.props.id}
        </h1>
      </div>
    );
  }
}
export default Users;
