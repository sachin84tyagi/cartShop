import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getItems,
  getCurrency,
  getTotal,
  removeFromCart,
  incrementCartItem,
  decrementCartItem,
} from "../reducers/cart";
import CartItem from "./CartItem";

const Cart = ({
  items,
  total,
  currency,
  removeFromCart,
  incrementCartItem,
  decrementCartItem,
}) => {
  return (
    <div>
      <h3>Shopping Cart</h3>

      <div className="cart">
        <div className="panel panel-default">
          <div className="panel-body">
            {items.length > 0 && (
              <div className="cart__body">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onClick={() => removeFromCart(item.id)}
                    onIncrement={() => incrementCartItem(item)}
                    onDecrement={() => decrementCartItem(item)}
                  />
                ))}
              </div>
            )}
            {items.length === 0 && <div className="">Cart is empty</div>}
            <div className="cart__total">
              Total: {total} {currency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  items: PropTypes.array,
  total: PropTypes.number,
  currency: PropTypes.string,
  removeFromCart: PropTypes.func.isRequired,
  incrementCartItem: PropTypes.func.isRequired,
  decrementCartItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  console.log("mapStateToProps state", state);
  //const itemData = getItems(state, props);
  //console.log("getItems itemData :: ", itemData);
  return {
    items: state.cart.items,
    currency: getCurrency(state, props),
    total: getTotal(state, props),
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (id) => dispatch(removeFromCart(id)),
  incrementCartItem: (items) => dispatch(incrementCartItem(items)),
  decrementCartItem: (items) => dispatch(decrementCartItem(items)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
