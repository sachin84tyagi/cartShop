import logo from "./logo.svg";
import "./App.scss";
import Header from "./helper/header";

import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="main">
      {/* <div className="wrapper">
        <Header />
      </div> */}
      <Header />
      <div className="wrapper">
        <aside className="lft">
          Here product displaying
          <ProductList />
        </aside>
        <aside className="rgt showOnDesktop">
          <Cart />
        </aside>
      </div>
    </div>
  );
}

export default App;
