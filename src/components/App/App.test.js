import React from 'react';
import { shallow } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import OrderForm from '../OrderForm/OrderForm.js'
import App from './App'

describe('<App/>', () =>{
  it('renders without crashing', () => {
    const wrapper = shallow((<App><OrderForm/></App>))
    expect(wrapper.contains(<OrderForm/>)).to.equal(true)
  })
})