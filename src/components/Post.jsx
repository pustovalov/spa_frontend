import React, { Component } from 'react'

export default class Post extends Component {
  render() {
    return(
      <div key={this.props.id}>
        <h3>
          Username: { this.props.username }
        </h3>
        <p>
          Title: { this.props.title }
        </p>
        <p>
          Body: { this.props.body }
        </p>
        <div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  id: React.PropTypes.number.isRequired,
  username: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired
}
