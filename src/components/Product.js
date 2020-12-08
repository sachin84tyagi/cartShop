import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addToCart, removeFromCart, isInCart } from "../reducers/cart";

class Product extends Component {
  handleClick = () => {
    const { id, addToCart, removeFromCart, isInCart } = this.props;
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  render() {
    const { name, price, image, isInCart } = this.props;

    //const calDiscount = parseInt(price.display) - parseInt(price.actual) / 100;
    const calDiscount = 100 * (price.display - price.actual) / price.display;

    return (

      <div className="product thumbnail">
        <img src={image} alt="product" />
        <div className="caption">
          <h3>{name}</h3>
          <div className="item-price"><span className="line-through">{price.display}</span> <strong>{price.actual}</strong></div>
          <div className={isInCart ? "btnDisabled" : "btn"}>
            <button
              disabled={isInCart ? "disabled" : ""}
              onClick={this.handleClick}
            >{isInCart ? "Added" : "Add to cart"}
            </button>
          </div>
        </div>
        <div className="discount">
          {Math.ceil(calDiscount)}%
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
