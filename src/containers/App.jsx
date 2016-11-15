import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar.jsx'

require('../css/app.scss')

class App extends Component {
  render() {
    const { dispatch, isAuthenticated, userName, isAdmin } = this.props
    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          userName={userName}
          dispatch={dispatch} />

        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userName: state.authReducer.userName,
  isAdmin: state.authReducer.isAdmin,
  isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps)(App)
