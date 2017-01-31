import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import NotFound from 'NotFound';
import messages from '../src/l10n/en.json'
import { IntlProvider } from 'react-intl'

describe('<NotFound />', () => {
  const wrapper = mount(
    <IntlProvider locale={ "en" } messages={ messages }>
      <NotFound />
    </IntlProvider>
  )

  it('has right text', () => {
    expect(wrapper.find('.ac-error-message').text()).to.equal('Page is not found,Back to home page')
  })
})
