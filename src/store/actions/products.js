import { productConstants } from "../constants";
import { productService } from "../../services/userService";
import { alertActions } from "../actions/alertAction";

export const userActions = {
  getUser,
};

function getProducts() {
  return (dispatch) => {
    dispatch(request());
    productService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: productConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: productConstants.GETALL_FAILURE, error };
  }
}
