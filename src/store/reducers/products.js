import { productConstants } from "../constants/products";

const ProductReducer = (state = {}, action) => {
  switch (action.type) {
    case productConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case productConstants.GETALL_SUCCESS:
      return {
        items: action.users,
      };
    case productConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
};

export default ProductReducer;
