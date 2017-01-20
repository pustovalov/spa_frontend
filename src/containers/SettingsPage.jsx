import React from 'react'
import { connect } from 'react-redux'
import serialize from 'form-serialize'
import ErrorMessage from 'ErrorMessage'
import Select from 'react-select'
import { FormattedMessage, defineMessages } from 'react-intl'

import * as UserActions from 'UserActions'

// styles
require('ReactSelect')

const translations = defineMessages({
  predefinedTranslation: {
    id: 'hey',
    defaultMessage: 'Hello I am predefined'
  }
})

class SettingsPage extends React.Component {
  constructor(props) {
    super(props)

    this.handleChangeSelect = this.handleChangeSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.props.fetchData()
  }

  handleSubmit (e) {
    e.preventDefault()

    let formData = serialize(e.target, { hash: true })

    this.props.saveChanges(formData)
  }

  handleChangeSelect (locale) {
    this.props.changeLocale(locale.value)
  }

  render() {
    const { errorMessage, userName, availableLocales, userLocale } = this.props

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <form ref="form" onSubmit={ this.handleSubmit } >
              <div className="form-group">
                <label htmlFor="name">Your name:</label>

                <input type="text"
                       className="form-control"
                       id="name"
                       placeholder="Your Name"
                       ref="name"
                       name="name"
                       defaultValue={ userName } />
              </div>

              <div className="form-group">
                <label htmlFor="password">New Password:</label>

                <input type="password"
                       className="form-control"
                       id="password"
                       name="password"
                       placeholder="New Password"
                       ref="password" />
              </div>

              {do {
                if (availableLocales) {
                  <div className="form-group">
                    <label htmlFor="locale">Language:</label>

                      <Select
                          name="locale"
                          options={availableLocales}
                          value={userLocale}
                          clearable={false}
                          onChange={this.handleChangeSelect} />
                  </div>
                }
              }}

              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit">
                 Save
              </button>

              {do {
                if (errorMessage) {
                  <ErrorMessage messages={errorMessage}/>
                }
              }}

            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startType: () => dispatch(UserActions.startType()),
  changeLocale: (locale) => dispatch(UserActions.changeLocale(locale)),
  fetchData: () => dispatch(UserActions.fetchSettingsData()),
  saveChanges: (obj) => dispatch(UserActions.saveChanges(obj))
})


const mapStateToProps = state => {
  let userReducer = state.userReducer
  return {
    errorMessage: userReducer.errorMessage,
    userName: userReducer.userName,
    availableLocales: userReducer.availableLocales,
    userLocale: userReducer.userLocale
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
