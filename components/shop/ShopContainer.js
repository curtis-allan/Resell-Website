import React, { Component } from "react";
import ShopItem from "./ShopItem";
import { Container, Button, Form } from "semantic-ui-react";

class ShopContainer extends Component {
  state = {
    shopItems: [],
    newItem: {
      name: "",
      price: 0
    }
  };

  handleAdd = e => {
    let shopItems = [...this.state.shopItems, this.state.newItem];
    this.setState({ shopItems });
    e.preventDefault();
  };

  handleDelete = id => {
    let shopItems = [...this.state.shopItems.filter(item => item.name !== id)];
    this.setState({ shopItems });
  };

  handleChange = e => {
    let newItem = { ...this.state.newItem };
    const { name, value } = e.target;
    newItem[name] = value;
    this.setState({ newItem });
  };

  mapShopItems = () => {
    let items = this.state.shopItems.map(item => (
      <ShopItem
        onDelete={() => {
          this.handleDelete(item.name);
        }}
        key={item.name}
        price={item.price}
        name={item.name}
      />
    ));

    return items;
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleAdd}>
          <Form.Field>
            <label>
              Enter Item Name:
              <input
                type="text"
                name="name"
                placeholder="Item Name... "
                value={this.state.newItem.name}
                onChange={this.handleChange}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label>
              Enter Price:
              <input
                type="number"
                name="price"
                placeholder="Item Price... "
                value={this.state.newItem.price}
                onChange={this.handleChange}
              />
            </label>
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
        <ul>{this.mapShopItems()}</ul>
      </Container>
    );
  }
}

export default ShopContainer;
