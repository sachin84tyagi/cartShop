import React from "react";
import PropTypes from "prop-types";

const CartItem = ({ name, price, onClick }) => {
  return (
    <div className="cart-item">
      <div>
        <button className="btn btn-danger btn-xs" onClick={onClick}>
          X
        </button>
        <span className="cart-item__name">{name}</span>
      </div>
      <div className="cart-item__price">{price.actual}</div>
    </div>
  );
};

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.object,
  currency: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CartItem;
