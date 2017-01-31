import React, { Component } from 'react'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { translations } from 'Translations'

export default class NotFound extends Component {
  render() {
    return (
      <div className="ac-error-message">
        <FormattedMessage
          {...translations.page_not_found}
        />
        ,
        <Link to="/">
          <FormattedMessage
            {...translations.back_to_home}
          />
        </Link>
      </div>
    );
  }
}
