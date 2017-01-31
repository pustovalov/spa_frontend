import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import PostForm from 'PostForm';
import messages from '../src/l10n/en.json'
import { IntlProvider } from 'react-intl'

describe('<PostForm />', () => {
  const wrapper = mount(
    <IntlProvider locale={ "en" } messages={ messages }>
      <PostForm />
    </IntlProvider>
  )

  it('has all fields', () => {
    expect(wrapper.find('.form-group')).to.have.length(4)
  })

  it('has submit button', () => {
    expect(wrapper.find('.ac-submit')).to.have.length(1)
  })
})
