import Link from "next/link";
import { Header, Menu, Icon } from "semantic-ui-react";
import React, { Component } from "react";

export default class NavHeader extends Component {
  state = {
    activeItem: ""
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu>
        <Header as="h1" attached>
          Resell App
        </Header>
        <Menu.Menu position="right">
          <Link href="/" passHref>
            <Menu.Item
              name="Home"
              active={activeItem === "Home"}
              onClick={this.handleItemClick}
              as="a"
            >
              Home
            </Menu.Item>
          </Link>
          <Link href="/shop" passHref>
            <Menu.Item
              name="Shop"
              active={activeItem === "Shop"}
              onClick={this.handleItemClick}
              as="a"
            >
              Shop
            </Menu.Item>
          </Link>
          <Link href="/about" passHref>
            <Menu.Item
              name="About"
              active={activeItem === "About"}
              onClick={this.handleItemClick}
              as="a"
            >
              About
            </Menu.Item>
          </Link>
          <Link href="/about" passHref>
            <Menu.Item
              name="Cart"
              active={activeItem === "Cart"}
              onClick={this.handleItemClick}
              as="a"
            >
              <Icon name="shopping cart" />
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Menu>
    );
  }
}
