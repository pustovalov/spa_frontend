import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from 'Navbar'

require('AppCSS')

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
  userName: state.userReducer.userName,
  isAdmin: state.userReducer.isAdmin,
  isAuthenticated: state.userReducer.isAuthenticated
})

export default connect(mapStateToProps)(App)
