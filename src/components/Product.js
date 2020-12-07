import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addToCart, removeFromCart, isInCart } from "../ducks/cart";

class Product extends Component {
  handleClick = () => {
    const { id, addToCart, removeFromCart, isInCart } = this.props;
    if (isInCart) {
      removeFromCart(id);
    } else {
      console.log("ADD TO CART");
      addToCart(id);
    }
  };

  render() {
    console.log("PROPS :: => ", this.props);
    const { name, price, discount, image, isInCart } = this.props;

    return (
      <div className="product thumbnail">
        <img src={image} alt="product" />
        <div className="caption">
          <h3>{name}</h3>
          <div className="product__price">{price.actual}</div>
          <div className="product__button-wrap">
            <button
              disabled={isInCart ? "disabled" : ""}
              className={isInCart ? "btn btn-danger" : "btn btn-primary"}
              onClick={this.handleClick}
            >
              {isInCart ? "Added" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.object,
  currency: PropTypes.string,
  image: PropTypes.string,
  isInCart: PropTypes.bool.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    isInCart: isInCart(state, props),
  };
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (id) => dispatch(addToCart(id)),
  removeFromCart: (id) => dispatch(removeFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
