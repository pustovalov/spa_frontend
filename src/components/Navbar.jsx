import React, { Component } from 'react'
import { Link } from 'react-router'

import { logoutUser } from 'AuthActions'

export default class PostForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { dispatch, isAuthenticated, userName, isAdmin } = this.props

    return(
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">Home</Link>
              </li>
              {isAdmin &&
                <li>
                  <Link to="/admin">Admin Page</Link>
                </li>
              }
            </ul>

            {isAuthenticated &&
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <p className="navbar-text">
                    Name: { userName }
                  </p>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <button onClick={() => dispatch(logoutUser())} className="btn btn-default navbar-btn">
                    Logout
                  </button>
                </li>
              </ul>
            }

            {!isAuthenticated &&
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/sign_up">Sign up</Link>
                </li>
              </ul>
            }

          </div>
        </div>
      </nav>
    )
  }
}
