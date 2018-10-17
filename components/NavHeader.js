import Link from "next/link";
import { Menu, Icon, Button, Container } from "semantic-ui-react";

export default () => {
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
        <Menu.Item>
          <Button primary>Sign up</Button>
        </Menu.Item>

        <Menu.Item>
          <Button>Log-in</Button>
        </Menu.Item>
        <Link href="/cart" passHref>
          <Menu.Item name="cart" as="a">
            <Icon name="shopping cart" />
          </Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
