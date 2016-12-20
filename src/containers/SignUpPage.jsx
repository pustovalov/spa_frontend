import React from 'react'
import { connect } from 'react-redux'
import serialize from 'form-serialize'

import * as AuthActions from '../actions/AuthActions.js'

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

    let obj = JSON.stringify(formData)
    this.props.signUp(obj)
  }

  render() {
    const { errorMessage } = this.props

    return (
      <form className="form-signin" onSubmit={this.handleSignUp}>
        <input className="form-control middle"
               type="email"
               placeholder="Email adress"
               ref="email"
               name="email"
               onChange={this.handleChangeInput} />

        <input className="form-control middle"
               type="text"
               placeholder="Name"
               ref="name"
               name="name"
               onChange={this.handleChangeInput} />

        <input className="form-control last"
               type="password"
               placeholder="Password"
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
           <div className="alert alert-danger text-center">
             {errorMessage}
           </div>
         }
       }}

      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signUp: (data) => dispatch(AuthActions.signUpUser(data)),
  startType: () => dispatch(AuthActions.loginStartType())
})


const mapStateToProps = state => ({
  errorMessage: state.authReducer.errorMessage
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
