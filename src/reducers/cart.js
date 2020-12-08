import { getProduct, getCartProduct } from "../reducers/products";

import getAllProducts, { getProductById } from "../services/ProductService";

// actions
const ALL_PROD = "product/ALL";
const CART_INC = "cart/INC";
const CART_DEC = "cart/DEC";
const CART_ADD = "cart/ADD";
const CART_REMOVE = "cart/REMOVE";

// reducer
const initialState = {
  items: [], // array of product ids
  currency: "INR",
};

export default function cart(state = initialState, action = {}) {
  switch (action.type) {
    case ALL_PROD:
      return handleProduct(state, action.payload);
    case CART_ADD:
      return handleCartAdd(state, action.payload);
    case CART_INC:
      return handleCartInc(state, action.payload);
    case CART_DEC:
      return handleCartDec(state, action.payload);
    case CART_REMOVE:
      return handleCartRemove(state, action.payload);
    default:
      return state;
  }
}

function handleProduct(state, payload) {
  return {
    ...state,
    products: payload.products,
  };
}

function handleCartInc(state, payload) {
  payload.item.qty =
    payload.item.qty < 20 ? payload.item.qty + 1 : payload.item.qty;
  return {
    ...state,
    items: [...state.items],
  };
}

function handleCartDec(state, payload) {
  payload.item.qty = payload.item.qty > 1 ? payload.item.qty - 1 : 1;
  return {
    ...state,
    items: [...state.items],
  };
}
function handleCartAdd(state, payload) {
  return {
    ...state,
    items: [...state.items, getProductById(payload.productId)],
  };
}

function handleCartRemove(state, payload) {
  return {
    ...state,
    items: state.items.filter((item) => item.id !== payload.productId),
  };
}

function addQty(state) { }
// action creators
export function addToCart(productId) {
  return {
    type: CART_ADD,
    payload: {
      productId,
    },
  };
}

export function removeFromCart(productId) {

  return {
    type: CART_REMOVE,
    payload: {
      productId,
    },
  };
}

export function incrementCartItem(item) {
  return {
    type: CART_INC,
    payload: {
      item,
    },
  };
}

export function decrementCartItem(item) {
  return {
    type: CART_DEC,
    payload: {
      item,
    },
  };
}

export function getAllProductsData() {
  const productData = getAllProducts();
  return {
    type: ALL_PROD,
    payload: {
      products: productData,
    },
  };
}

// selectors
export function isInCart(state, props) {
  let ids = [];
  const items = state.cart.items ? state.cart.items : null;
  if (items != null) {
    items.map((val, index) => {
      ids.push(val.id);
    });
    return ids.indexOf(props.id) !== -1;
  }
}

export function getItems(state, props) {
  return state.cart.items.map((id) => getCartProduct(state, { id }));
}

export function getCartItems(state, props) {
  return state.cart.items.map((id) => getCartProduct(state, { id }));
}

export function getCurrency(state, props) {
  return state.cart.currency;
}

export function getTotal(state, props) {
  let actualPrice = 0;
  let displayPrice = 0
  if (state.cart.items.length > 0) {
    state.cart.items.map((item) => {
      let totalActual = item.price.actual * item.qty;
      let totalDisplay = item.price.display * item.qty;
      actualPrice = actualPrice + totalActual;
      displayPrice = displayPrice + totalDisplay;
    })
  }

  return [actualPrice, displayPrice]
  // if (state.cart.items.length > 0) {
  //   console.log("state.cart.items :: ", state.cart.items)
  //   const getTotal = state.cart.items.reduce((acc, value) => {
  //     console.log("acc :: ", acc.price.actual);
  //     console.log("value :: ", value.price.actual)
  //     return acc.price.actual + value.price.actual
  //   });
  //   console.log("getTotal :: ", getTotal);
  //   return getTotal;
  // }

  // let ids = [];
  // const items = state.cart.items ? state.cart.items : null;
  // if (items != null) {
  //   items.map((val, index) => {
  //     ids.push(val.id);
  //   });
  // }


  // return ids.reduce((acc, id) => {
  //   const item = getProduct(state, { id });
  //   return acc + item.price.actual;
  // }, 0);
}
