import { getOrders } from '../../apiCalls'

export const GET_ORDERS_PENDING = "GET_ORDERS_PENDING";
export const GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS";
export const GET_ORDERS_FAILED = "GET_ORDERS_FAILED";
// Get the orders and set the dispatch payload based on the result.
export const setOrders = () => {
  return async dispatch => {
    try {
      dispatch({ type: GET_ORDERS_PENDING });
      const orders = await getOrders();
      dispatch({ 
        type: GET_ORDERS_SUCCESS, payload: orders });
    } catch (err) {
      dispatch({ type: GET_ORDERS_FAILED, payload: err });
    }
  };
};