import React, { Component } from "react";
import ShopItem from "./ShopItem";
import { Container, Button, Form, Card, Segment } from "semantic-ui-react";
import axios from "axios";
import Router from "next/router";

class ShopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const item = { ...this.state };
    axios.post("http://localhost:5000/api/shop", item).then(res => {
      if (res.data.success) {
        window.alert(`Successfully added: ${item.name} for ${item.price}`);
        Router.push("/shop");
      } else {
        window.alert("Couldn't Save to Database");
      }
    });
  };

  handleDelete = id => {
    axios.delete(`http://localhost:5000/api/shop/${id}`).then(res => {
      if (res.data.success) {
        window.alert("Successfully Deleted the Item");
        Router.push("/shop");
      } else {
        window.alert("Couldn't Delete from Database");
      }
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  mapShopItems = () => {
    let shopItems = [];
    [...this.props.items].forEach(item => {
      shopItems.push({
        header: item.name,
        description: item._id,
        meta: `$ ${item.price}`
      });
    });

    return shopItems;
  };

  render() {
    return (
      <Container>
        {this.props.form && (
          <Segment>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>
                  Enter Item Name:
                  <input
                    type="text"
                    name="name"
                    placeholder="Item Name... "
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
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
                    value={this.state.price}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
          </Segment>
        )}

        <Segment>
          <Card.Group items={this.mapShopItems()} />
        </Segment>
      </Container>
    );
  }
}

export default ShopContainer;
