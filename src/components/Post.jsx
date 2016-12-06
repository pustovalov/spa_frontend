import React, { Component } from 'react'
import { Link } from 'react-router'
import { formatDate } from '../helpers'

export default class Post extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div key={this.props.id}>
        { this.props.link ?
          <h3>
            <Link to={"/posts/" + this.props.id}>
              Title: { this.props.title }
            </Link>
          </h3>
        :
          <h3>
            Title: { this.props.title }
          </h3>
        }
        <p>
          Username: { this.props.username }
        </p>
        <p>
          Body: { this.props.body }
        </p>
        <p>
          Created at: { formatDate(this.props.createdAt) }
        </p>
        <button onClick={() => this.props.removePost(this.props.id)} className="btn btn-default">Remove</button>
        <br />
        <br />
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
