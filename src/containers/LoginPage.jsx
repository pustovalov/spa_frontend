import React from 'react'
import { connect } from 'react-redux'

import * as LoginActions from '../actions/LoginActions.js'

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
    this.props.startType()

    let allowed = false
    if (this.refs.email.value.trim() && this.refs.password.value.trim() ) {
      allowed = true
    }
    this.setState({submitAllowed: allowed})
  }

  handleSubmit (e) {
    e.preventDefault()
    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    if (!password || !email) {
      return
    }

    let data = {
      auth: {
        email: email,
        password: password
      }
    }

    let obj = JSON.stringify(data)
    this.props.login(obj)
  }

  render() {
    const { errorMessage } = this.props

    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <input className="form-control first"
               type="email"
               placeholder="Email adress"
               ref="email"
               onChange={this.handleChangeInput} />
        <input className="form-control second"
              type="password"
              placeholder="Password"
              ref="password"
              onChange={this.handleChangeInput} />
       <button className={ "btn btn-lg btn-primary btn-block" + (this.state.submitAllowed ? '' : ' disabled') } type="submit">Sign in</button>

       { errorMessage &&
         <div className="alert alert-danger text-center">
           {errorMessage}
         </div>
       }

      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(LoginActions.loginUser(data)),
  startType: () => dispatch(LoginActions.loginStartType())
})


const mapStateToProps = state => ({
  errorMessage: state.authReducer.errorMessage
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
