import products from "./ProductData";

export default function getAllProducts() {
  return products;
}

export function getProductById(prductId) {
  const cartProducts = products.find((item) => item.id === prductId);
  return { ...cartProducts, qty: 1 };
}
