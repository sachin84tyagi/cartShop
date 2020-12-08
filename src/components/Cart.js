import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
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
  console.log("TOTAL IN CART JS :: ", total)
  console.log("items.length :: ", items.length)
  const discount = parseInt(total[1]) - parseInt(total[0])
  return (
    <div>
      <h3>Shopping Cart</h3>

      <div className="cart">
        <div className="panel panel-default">
          <div className="panel-body">
            {items.length > 0 && (
              <div className="cart__body">
                <div className="item-header">
                  <div>Items(4)</div>
                  <div>Quantity</div>
                  <div>Price</div>
                </div>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onClick={() => removeFromCart(item.id)}
                    onIncrement={() => incrementCartItem(item)}
                    onDecrement={() => decrementCartItem(item)}
                  />
                ))}
                <div className="totals">
                  <h3>Total</h3>
                  <div className="totals-item">
                    <label>Items</label>
                    <div className="totals-value" id="cart-subtotal">{total[1]}</div>
                  </div>
                  <div className="totals-item">
                    <label>Discount</label>
                    <div className="totals-value" id="cart-tax">-{discount}</div>
                  </div>
                  <div className="totals-item">
                    <label>Type Discount</label>
                    <div className="totals-value" id="cart-shipping">-0</div>
                  </div>
                  <div className="totals-item totals-item-total">
                    <label>Grand Total</label>
                    <div className="totals-value" id="cart-total">{total[0]}</div>
                  </div>
                </div>
              </div>
            )}
            {items.length === 0 && <div className="">Cart is empty</div>}

          </div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  items: PropTypes.array,
  total: PropTypes.array,
  removeFromCart: PropTypes.func.isRequired,
  incrementCartItem: PropTypes.func.isRequired,
  decrementCartItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
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
