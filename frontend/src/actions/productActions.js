import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  // dispatch a request
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });

  // fetch data from backend
  try {
    const { data } = await axios.get("/api/products"); // send ajax request

    // dispatch action
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};
