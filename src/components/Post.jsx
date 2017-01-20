import React, { Component } from 'react'
import { Link } from 'react-router'
import { formatDate } from '../helpers'
import { FormattedMessage } from 'react-intl'
import { translations } from 'Translations'

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
              <FormattedMessage
                {...translations.title}
              />
              : { this.props.title }
            </Link>
          </h3>
        :
          <h3>
            <FormattedMessage
              {...translations.title}
            />
            : { this.props.title }
          </h3>
        }
        {this.props.image.url &&
          <div className="mb-1 thumbnail inline-block">
            <img src={this.props.image.thumb.url} />
          </div>
        }
        <p>
          <FormattedMessage
            {...translations.user_name}
          />
          : { this.props.username }
        </p>
        <p>
          <FormattedMessage
            {...translations.body}
          />
          : { this.props.body }
        </p>
        <p>
          <FormattedMessage
            {...translations.created_at}
          />
          : { formatDate(this.props.createdAt) }
        </p>
        <button onClick={() => this.props.removePost(this.props.id)} className="btn btn-default">
          <FormattedMessage
            {...translations.remove}
          />
        </button>
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
