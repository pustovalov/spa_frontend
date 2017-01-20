import React from 'react'
import { connect } from 'react-redux'
import serialize from 'form-serialize'
import ErrorMessage from 'ErrorMessage'

import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { translations } from 'Translations'

import * as UserActions from 'UserActions'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitAllowed: false
    }

    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleChangeInput () {
    this.props.startType()
    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()
    let name = this.refs.name.value.trim()

    let allowed = false
    if (email && password && name ) {
      allowed = true
    }
    this.setState({submitAllowed: allowed})
  }

  handleSignUp (e) {
    e.preventDefault()
    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()
    let name = this.refs.name.value.trim()

    if (!password || !email || !name) {
      return
    }

    let auth = serialize(e.target, { hash: true })
    let formData = { auth }

    this.props.signUp(formData)
  }

  render() {
    const { errorMessage } = this.props
    const { formatMessage } = this.props.intl

    return (
      <form className="form-signin" onSubmit={this.handleSignUp}>
        <input className="form-control middle"
               type="email"
               placeholder={formatMessage(translations.placeholder_email)}
               ref="email"
               name="email"
               onChange={this.handleChangeInput} />

        <input className="form-control middle"
               type="text"
               placeholder={formatMessage(translations.placeholder_name)}
               ref="name"
               name="name"
               onChange={this.handleChangeInput} />

        <input className="form-control last"
               type="password"
               placeholder={formatMessage(translations.placeholder_password)}
               ref="password"
               name="password"
               onChange={this.handleChangeInput} />

       <button
         className={ "btn btn-lg btn-primary btn-block" + (this.state.submitAllowed ? '' : ' disabled') }
         type="submit">
          Sign up
       </button>

       {do {
         if (errorMessage) {
           <ErrorMessage messages={errorMessage}/>
         }
       }}

      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signUp: (data) => dispatch(UserActions.signUpUser(data)),
  startType: () => dispatch(UserActions.startType())
})


const mapStateToProps = state => ({
  errorMessage: state.userReducer.errorMessage
})

Signup.propTypes = {
  intl: intlShape.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Signup))
