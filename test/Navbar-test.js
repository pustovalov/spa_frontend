import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Navbar from 'Navbar';

describe('<Navbar />', () => {

  it('calls componentDidMount', () => {
    const wrapper = mount(<Navbar />);
    expect(Navbar.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});
