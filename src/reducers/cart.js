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
  console.log("handleProduct payload", payload);
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
  payload.item.qty = payload.item.qty > 0 ? payload.item.qty - 1 : 0;
  return {
    ...state,
    items: [...state.items],
  };
}
function handleCartAdd(state, payload) {
  const productId = payload.productId;
  const data = getProductById(productId);
  //
  console.log("HANDLE CART ARRAY :: data ", data);
  const sampleData = [...state.items, data];
  console.log("sampleData :: ", sampleData);

  return {
    ...state,
    items: [...state.items, data],
  };
}

function handleCartRemove(state, payload) {
  return {
    ...state,
    items: state.items.filter((id) => id !== payload.productId),
  };
}

function addQty(state) {}
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
  console.log("state.cart.items :: ", state.cart.items);
  const items = state.cart.items ? state.cart.items : null;
  if (items != null) {
    items.map((val, index) => {
      ids.push(val.id);
    });
    return ids.indexOf(props.id) !== -1;
  }
}

export function getItems(state, props) {
  console.log("getItems :: state.cart.items ", state.cart.items);
  return state.cart.items.map((id) => getCartProduct(state, { id }));
}

export function getCartItems(state, props) {
  console.log("getItems :: state.cart.items ", state.cart.items);
  return state.cart.items.map((id) => getCartProduct(state, { id }));
}

export function getCurrency(state, props) {
  return state.cart.currency;
}

export function getTotal(state, props) {
  let ids = [];
  console.log("state.cart.items :: ", state.cart.items);
  const items = state.cart.items ? state.cart.items : null;
  if (items != null) {
    items.map((val, index) => {
      ids.push(val.id);
    });
  }

  return ids.reduce((acc, id) => {
    const item = getProduct(state, { id });
    return acc + item.price.actual;
  }, 0);
}
