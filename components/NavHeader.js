import Link from "next/link";
import { Menu, Button, Segment, Container } from "semantic-ui-react";
import React, { Component } from "react";
import axios from "axios";

export default class NavHeader extends Component {
  state = {
    activeItem: "",
    token: ""
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  handleLogin = () => {
    axios.post("http://localhost:5000/api/login").then(res => {
      const token = res.data;
      this.setState({ token });
    });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu size="large" secondary>
        <Container>
          <Link href="/">
            <Menu.Item as="a" active={activeItem === "Home"}>
              Home
            </Menu.Item>
          </Link>
          <Link href="/shop">
            <Menu.Item as="a" active={activeItem === "Shop"}>
              Shop
            </Menu.Item>
          </Link>
          <Menu.Item as="a">Company</Menu.Item>
          <Menu.Item as="a">Careers</Menu.Item>
          <Menu.Item as="a">
            Token:
            {this.state.token && this.state.token.token}
          </Menu.Item>
          <Menu.Item position="right">
            <Button as="a" onClick={this.handleLogin}>
              Log in
            </Button>
            <Button as="a" inverted primary style={{ marginLeft: "0.5em" }}>
              Sign Up
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}
