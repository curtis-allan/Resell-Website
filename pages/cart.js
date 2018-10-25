import React from "react";

export default class cart extends React.Component {
  static async getInitialProps(req) {
    let props = {};
    props.user = req.user;
    return { props };
  }
  render() {
    return (
      <div>
        <h1>THIS IS HIDDEN: username - {this.props.user.username}</h1>
      </div>
    );
  }
}
