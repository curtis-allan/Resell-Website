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
          <Menu.Item position="right">
            <Link href="/login">
              <Button as="a">Log in</Button>
            </Link>
            <Button as="a" inverted primary style={{ marginLeft: "0.5em" }}>
              Sign Up
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}
