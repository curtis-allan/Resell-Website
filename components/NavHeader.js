import Link from "next/link";
import React from "react";
import { Menu, Icon, Button } from "semantic-ui-react";

export default class NavHeader extends React.Component {
  render() {
    return (
      <Menu borderless>
        <Menu.Item header as="h2">
          Resell App
        </Menu.Item>
        <Menu.Menu position="right">
          <Link href="/" passHref>
            <Menu.Item name="home" as="a">
              Home
            </Menu.Item>
          </Link>
          <Link href="/shop" passHref>
            <Menu.Item name="shop" as="a">
              Shop
            </Menu.Item>
          </Link>
          <Link href="/about" passHref>
            <Menu.Item name="about" as="a">
              About
            </Menu.Item>
          </Link>
          <Menu.Item name="signup">
            <Link href="/signup" passHref>
              <Button primary>Sign up</Button>
            </Link>
          </Menu.Item>

          <Menu.Item name="login">
            <Link href="/login" passHref>
              <Button>Log-in</Button>
            </Link>
          </Menu.Item>
          <Link href="/cart" passHref>
            <Menu.Item name="cart" as="a">
              <Icon name="shopping cart" />
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Menu>
    );
  }
}
