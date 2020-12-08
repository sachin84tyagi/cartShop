import { combineReducers } from "redux";

import ProductReducer from "./ProductReducer";

const rootReducer = combineReducers({
  ProductReducer: ProductReducer,
});

export default rootReducer;
