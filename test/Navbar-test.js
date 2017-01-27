import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Navbar from 'Navbar';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import messages from '../src/l10n/en.json'
import { IntlProvider } from 'react-intl'
import { spy } from 'sinon';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const store = mockStore({})


describe('<Navbar />', () => {
  spy(Navbar.prototype, 'componentDidMount');
  const wrapper = mount(
    <Provider store={store}>
      <IntlProvider locale={ "en" } messages={ messages }>
        <Navbar />
      </IntlProvider>
    </Provider>
  );

  it('calls componentDidMount', () => {
    expect(Navbar.prototype.componentDidMount.calledOnce).to.equal(true)
  });

  it('has language dropdown', () => {
    expect(wrapper.find('.ac-language-dropdown')).to.have.length(1)
  });
});
