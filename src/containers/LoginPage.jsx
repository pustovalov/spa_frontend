import React from 'react'
import { connect } from 'react-redux'
import serialize from 'form-serialize'
import ErrorMessage from 'ErrorMessage'

import * as AuthActions from 'AuthActions'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitAllowed: false
    }

    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleChangeInput () {
    this.props.startType()

    let allowed = false
    if (this.refs.email.value.trim() && this.refs.password.value.trim() ) {
      allowed = true
    }
    this.setState({submitAllowed: allowed})
  }

  handleLogin (e) {
    e.preventDefault()
    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    if (!password || !email) {
      return
    }

    let auth = serialize(e.target, { hash: true })
    let formData = { auth }

    let obj = JSON.stringify(formData)
    this.props.login(obj)
  }

  render() {
    const { errorMessage } = this.props

    return (
      <form className="form-signin" ref="form" onSubmit={this.handleLogin}>
        <input className="form-control middle"
               type="email"
               placeholder="Email adress"
               ref="email"
               name="email"
               onChange={this.handleChangeInput} />

        <input className="form-control last"
               type="password"
               placeholder="Password"
               name="password"
               ref="password"
               onChange={this.handleChangeInput} />

        <button
          className={ "btn btn-lg btn-primary btn-block" + (this.state.submitAllowed ? '' : ' disabled') }
          type="submit">
           Sign in
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
  login: (data) => dispatch(AuthActions.loginUser(data)),
  startType: () => dispatch(AuthActions.loginStartType())
})


const mapStateToProps = state => ({
  errorMessage: state.authReducer.errorMessage
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
