import "./App.scss";
import Header from "./helper/header";

import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="main">
      <Header />
      <div className="wrapper">
        <aside className="lft">

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
