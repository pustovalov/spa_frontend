import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'

import * as LoginActions from '../actions/LoginActions.js'

function mapDispatchToProps(dispatch) {
  return {
    login: (data) => dispatch(LoginActions.login(data))
  }
}

function mapStateToProps(state) {
  return {
  }
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitAllowed: false
    }

    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeInput () {
    let allowed = false
    if (this.refs.email.value.trim() && this.refs.password.value.trim() ) {
      allowed = true
    }
    this.setState({submitAllowed: allowed})
  }

  handleSubmit (e) {
    console.log("handle")
    e.preventDefault()
    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    if (!password || !email) {
      return
    }

    let data = {
      email: email,
      password: password
    }

    let obj = JSON.stringify(data)
    this.props.login(obj)
  }

  render() {
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <input className="form-control first"
               type="text"
               placeholder="Email adress"
               ref="email"
               onChange={this.handleChangeInput} />
        <input className="form-control second"
              type="text"
              placeholder="Password"
              ref="password"
              onChange={this.handleChangeInput} />
       <button className={ "btn btn-lg btn-primary btn-block" + (this.state.submitAllowed ? '' : ' disabled') } type="submit">Sign in</button>

      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
