import React, { Component } from 'react'
import _ from 'lodash/lang'

export default class ErrorMessage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { messages } = this.props

    return (
      <div className="alert alert-danger text-center mt-1">
        {do {
          if (_.isArray(messages)) {
            messages.map((message, index) => {
              return <p key={ index }>{ message }</p>
            })
          } else {
            <p>
              { messages }
            </p>
          }
        }}
      </div>
    );
  }
}
