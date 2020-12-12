import OrderForm from "../OrderForm/OrderForm.js";
import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import { expect } from "chai";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

//shallow testing
describe("Render <App/> ", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <App>
        <OrderForm />
      </App>
    );
    expect(wrapper.contains(<OrderForm />)).to.equal(true);
  });
});
