import { connect } from "react-redux";
const Header = ({ items }) => {

  return (
    <header>
      <div className="compo"><h2 style={{ display: "inline-block" }}>All Items</h2>
        <h3 >Item {items.length} is added to cart.</h3>
      </div>
    </header>
  );
};

const mapStateToProps = (state, props) => {
  return {
    items: state.cart.items,
  };
};

export default connect(mapStateToProps)(Header);