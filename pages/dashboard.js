import React, { Component } from "react";

class Dashboard extends Component {
  state = {};
  render() {
    const user = this.props.auth.getProfile();
    return <div>Current User: {user.email}</div>;
  }
}

export default Dashboard;
