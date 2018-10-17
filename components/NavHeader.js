import Link from "next/link";
import { Header, Menu, Icon } from "semantic-ui-react";
import React, { Component } from "react";

export default class NavHeader extends Component {
  state = { activeItem: "" };

  handleItemClick = e => {
    this.setState({ activeItem: [e.target.name] });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu>
        <Header as="h1">Resell App</Header>
        <Menu.Menu position="right">
          <Link href="/" passHref>
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
              // as="a"
            >
              Home
            </Menu.Item>
          </Link>
          <Link href="/shop" passHref>
            <Menu.Item
              name="shop"
              active={activeItem === "shop"}
              onClick={this.handleItemClick}
              as="a"
            >
              Shop
            </Menu.Item>
          </Link>
          <Link href="/about" passHref>
            <Menu.Item
              name="about"
              active={activeItem === "about"}
              onClick={this.handleItemClick}
              as="a"
            >
              {activeItem}
            </Menu.Item>
          </Link>
          <Link href="/cart" passHref>
            <Menu.Item
              name="cart"
              active={activeItem === "cart"}
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
