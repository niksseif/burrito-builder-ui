import {
  GET_ORDERS_PENDING,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,
  ADD_ORDERS_PENDING,
  ADD_ORDERS_SUCCESS,
  ADD_ORDERS_FAILED,
} from "../actions/orders.js";

let initialState = {
  data: [],
  showError: false,
  isLoading: false,
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_PENDING:
      return { ...state, isLoading: true, showError: false };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        data: action.payload.orders,
        isLoading: false,
        showFetchError: false,
      };
    case GET_ORDERS_FAILED:
      return {
        payload: action.payload,
        showFetchError: true,
        isLoading: false,
      };
    case ADD_ORDERS_PENDING:
      return {
        ...state,
        isLoading: true,
        showError: false,
      };
    case ADD_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showError: false,
        data: [...state.data, action.payload],
      };
    case ADD_ORDERS_FAILED:
      return {
        ...state,
        isLoading: false,
        showError: true,
        payload: action.payload,
      };
    default:
      return state;
  }
};
