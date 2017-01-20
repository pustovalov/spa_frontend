import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { translations } from 'Translations'
import * as UserActions from 'UserActions'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  handleChangeLang(option, e) {
    e.preventDefault()
    this.props.changeLanguage(option)
  }

  render() {
    const { dispatch, isAuthenticated, userName, isAdmin } = this.props

    return(
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">
                  <FormattedMessage
                    {...translations.home}
                  />
                </Link>
              </li>
              {isAdmin &&
                <li>
                  <Link to="/admin">
                    <FormattedMessage
                      {...translations.admin_page}
                    />
                  </Link>
                </li>
              }
            </ul>

            {isAuthenticated &&
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <p className="navbar-text">
                    <FormattedMessage
                      {...translations.user_name}
                    />
                    : { userName }
                  </p>
                </li>
                <li>
                  <Link to="/settings">
                    <FormattedMessage
                      {...translations.settings}
                    />
                  </Link>
                </li>
                <li>
                  <button onClick={() => dispatch(UserActions.logoutUser())} className="btn btn-default navbar-btn">
                    <FormattedMessage
                      {...translations.log_out}
                    />
                  </button>
                </li>
              </ul>
            }

            {!isAuthenticated &&
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a data-target="#"
                     className="dropdown-toggle"
                     id="language"
                     data-toggle="dropdown"
                     role="button"
                     >
                     Language <span className="caret"></span>
                   </a>
                   <ul className="dropdown-menu" aria-labelledby="language">
                     <li>
                       <a href="#" onClick={this.handleChangeLang.bind(this, "ru")}>RU</a>
                     </li>
                     <li>
                       <a href="#" onClick={this.handleChangeLang.bind(this, "en")}>EN</a>
                     </li>
                   </ul>
                </li>
                <li>
                  <Link to="/login">
                    <FormattedMessage
                      {...translations.sign_in}
                    />
                  </Link>
                </li>
                <li>
                  <Link to="/sign_up">
                    <FormattedMessage
                      {...translations.sign_up}
                    />
                  </Link>
                </li>
              </ul>
            }
          </div>
        </div>
      </nav>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  changeLanguage: (lang) => dispatch(UserActions.setGuestLocale(lang))
})

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
