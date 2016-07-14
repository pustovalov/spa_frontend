import React, { Component } from 'react'

export default class Post extends Component {
  render() {
    return(
      <div key={this.props.id}>
        <h3>
          { this.props.name }
        </h3>
        <p>
          { this.props.description }
        </p>
      </div>
    )
  }
}

Post.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired
}
