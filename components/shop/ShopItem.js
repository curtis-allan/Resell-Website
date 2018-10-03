import React, { Component } from "react";

class ShopItem extends Component {
  render() {
    return (
      <li>
        <span>
          <h3 style={{ display: "inline", marginRight: "10px" }}>
            ${this.props.price} - {this.props.name}
          </h3>
          <button onClick={this.props.onDelete}>Remove</button>
        </span>
      </li>
    );
  }
}

export default ShopItem;
