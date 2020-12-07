import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts } from "../ducks/products";
import Product from "./Product";

const ProductList = ({ products }) => {
  return (
    <div>
      <h3>Products</h3>
      <ul className="product-list">
        {products.map((item) => (
          <li key={item.id} className="product-list__item">
            <Product {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = (state, props) => {
  return {
    products: getProducts(state, props),
  };
};

export default connect(mapStateToProps)(ProductList);
