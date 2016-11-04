import React, { Component } from 'react'
import { Link } from 'react-router'

export default class NotFound extends Component {
  render() {
    return (
      <div>
        Page is not found, <Link to="/">Back to home page</Link>
      </div>
    );
  }
}
