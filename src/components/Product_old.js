import React, { Component } from "react";

class Product extends Component {
  state = {
    cart: [
      {
        id: 2,
        name: "Samsung Super 6",
        image: "products/dummy.jpg",
        price: { actual: 35999, display: 66900 },
        discount: 46,
        units: 1,
      },
    ],
  };

  addToCart = (item) => {
    const updateItem = [{ ...item, units: 1 }];
    const { cart } = this.state;
    const existingProduct = cart.filter((p) => item.id === p.id);
    console.log("existingProduct", existingProduct);
    if (existingProduct.length > 0) {
      console.log("existingProduct", existingProduct);
      console.log(
        "typeof(existingProduct[0].units) ",
        typeof existingProduct[0].units
      );

      //console.log("typeof(item.units) ", typeof item.units);
      const updateProductUnit = {
        ...existingProduct[0],
        units: parseInt(existingProduct[0].units) + updateItem[0].units,
      };
      console.log("updateProductUnit :: ", updateProductUnit);
      this.setState({ cart: [...existingProduct, updateProductUnit] });
    } else {
      console.log("NON eXISTING PRODUCTS.........");
      this.setState({ cart: [...cart, updateItem[0]] });
    }
  };

  render() {
    const { item, index } = this.props;
    return (
      <div className="products">
        <div className="pBox" key={index}>
          {this.state.cart.map((cartItem) => (
            <div>
              <div>{cartItem.name}</div>
              <div>{cartItem.units}</div>
            </div>
          ))}
          <img src={item.image} alt={item.name} />
          <div className="pName">{item.name}</div>
          <div className="proPrice">
            <span className="item-AP">{item.price.display}</span>
            <span className="item-price">{item.price.actual}</span>
          </div>
          <button
            className="btn"
            style={{ border: "1px solid blue", cursor: "pointer" }}
            onClick={() => this.addToCart(item)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
