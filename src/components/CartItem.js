import React from "react";
import PropTypes from "prop-types";

const CartItem = ({ name, price, qty, onClick, onIncrement, onDecrement }) => {
  const calPrice = price.actual * qty;
  return (

    <div className="shopping-cart">
      <div className="item">
        <div className="itemLft">
          <div className="image">
            <img src="products/dummy.jpg" alt="" />
          </div>
          <div className="description">
            <span>{name}</span>
          </div>
          <button className="btn btn-danger btn-xs" onClick={onClick}>
            X
      </button>
        </div>
        <div className="item-rgt">
          <div className="quantity">
            <button className="btn btn-danger btn-xs calc" onClick={onIncrement}>+</button>
      &nbsp; {qty} &nbsp;
      <button className="btn btn-danger btn-xs calc" onClick={onDecrement}>-</button>
          </div>
          <div className="total-price">{price.actual}</div>
        </div>
      </div>
    </div>


  );
};

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.object,
  currency: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

export default CartItem;
