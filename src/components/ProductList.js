import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts } from "../reducers/products";
import cart, { getAllProductsData } from "../reducers/cart";
import Product from "./Product";

class ProductList extends Component {
  state = {
    products: [],
  };
  componentDidMount() {
    //this.props.getAllProductsAction();
    this.setState({ products: this.props.products });
  }
  render() {
    const { products } = this.state;
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
  }
}

ProductList.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = (state, props) => {
  console.log("New Data State :: ", state);
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllProductsAction: () => dispatch(getAllProductsData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
