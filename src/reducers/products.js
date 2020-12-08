// reducer
export default function products(state = []) {
  return state; // nothing to do here, but we need products node in redux store
}

// selectors
export function getProducts(state, props) {
  return state.products;
}

export function getProduct(state, props) {
  return state.products.find((item) => item.id === props.id);
}

export function getCartProduct(state, props) {
  const cartProducts = state.products.find((item) => item.id === props.id);
  const cartWithQty = { ...cartProducts, qty: 1 };
  return cartWithQty;
}

// export function getAllProduct() {
//   return state.products.find((item) => item.id === prductId);
// }
