import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { OrderForm } from "./OrderForm.js";
import {
  ADD_ORDERS_PENDING,
  ADD_ORDERS_SUCCESS,
  ADD_ORDERS_FAILED,
} from "../../Redux/actions/orders.js";

//using react testing library with redux
afterEach(cleanup);

//initial state
const startingState = {
  data: null,
  showError: false,
  isLoading: false,
};

let orders = [
  {
    id: 1,
    name: "Pat",
    ingredients: ["beans", "lettuce", "carnitas", "queso fresco", "jalapeno"],
  },
  {
    id: 2,
    name: "Sam",
    ingredients: [
      "steak",
      "pico de gallo",
      "lettuce",
      "carnitas",
      "queso fresco",
      "jalapeno",
    ],
  },
  {
    id: 3,
    name: "Alex",
    ingredients: [
      "sofritas",
      "beans",
      "sour cream",
      "carnitas",
      "queso fresco",
    ],
  },
];
const test = {
  name: "test",
  ingredients: ["sofritas", "beans"],
};

//reducer function
function reducer(state = startingState, action) {
  switch (action.type) {
    case ADD_ORDERS_PENDING:
      return { ...state, isLoading: true };
    case ADD_ORDERS_SUCCESS:
      return { ...state, data: [...orders, test] };
    case ADD_ORDERS_FAILED:
      return { ...state, showError: true };
    default:
      return state;
  }
}
//adding redux store to this test and wraping our component with Provider
const renderWithRedux = (
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    ),
  };
};

it("renders with redux-submit button", () => {
  const { getByTestId } = renderWithRedux(<OrderForm />);
  expect(getByTestId("submit")).toHaveTextContent("Submit Order");
  expect(getByTestId("submit")).toHaveAttribute("disabled");
});
it("renders with redux-possible Ingredients texts", () => {
  const { getByTestId, getByText } = renderWithRedux(<OrderForm />);
  fireEvent.click(getByText("beans $2"));
  expect(getByTestId("ingrediant0")).toHaveTextContent("beans");
  expect(getByTestId("ingrediant1")).toHaveTextContent("steak");
});

// check if we are changing the input value name
describe("Input value", () => {
  it("updates on change", () => {
    const { queryByPlaceholderText } = render(<OrderForm />);

    const nameInput = queryByPlaceholderText("Name");
    fireEvent.change(nameInput, { target: { value: "test" } });

    expect(nameInput.value).toBe("test");
  });
});
