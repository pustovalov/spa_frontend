import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Post from 'Post';
import messages from '../src/l10n/en.json'
import { IntlProvider } from 'react-intl'

describe('<Post />', () => {
  const wrapper = mount(
    <IntlProvider locale={ "en" } messages={ messages }>
      <Post link={false}
            key={1}
            id={1}
            username={"user"}
            title={"title"}
            body={"131"}
            image={"http"}
            createdAt={"2017-01-22T12:51:15.743Z"}
            />
    </IntlProvider>
  )

  it('has remote button', () => {
    expect(wrapper.find('.ac-remove')).to.have.length(1)
  })

  it('has right title', () => {
    expect(wrapper.find('.ac-title').text()).to.equal('Title: title')
  })

  it('has right username', () => {
    expect(wrapper.find('.ac-user-name').text()).to.equal('User name: user')
  })

  it('has right date', () => {
    expect(wrapper.find('.ac-date').text()).to.equal('Created at: January 22nd 2017, 12:51:15 PM')
  })

  it('has right body', () => {
    expect(wrapper.find('.ac-body').text()).to.equal('Body: 131')
  })
})
