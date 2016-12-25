import React from 'react'
import { connect } from 'react-redux'
import serialize from 'form-serialize'
import ErrorMessage from 'ErrorMessage'
import Select from 'react-select'

import * as SettingsActions from 'SettingsActions'

// styles
require('ReactSelect')

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

    let params = serialize(e.target, { hash: true })
    let formData = { params }

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
  startType: () => dispatch(SettingsActions.startType()),
  changeLocale: (locale) => dispatch(SettingsActions.changeLocale(locale)),
  fetchData: () => dispatch(SettingsActions.fetchData()),
  saveChanges: (obj) => dispatch(SettingsActions.saveChanges(obj))
})


const mapStateToProps = state => {
  let settingsReducer = state.settingsReducer
  return {
    errorMessage: settingsReducer.errorMessage,
    userName: settingsReducer.userName,
    availableLocales: settingsReducer.availableLocales,
    userLocale: settingsReducer.userLocale
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
