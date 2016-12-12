import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import * as PostActions from '../actions/PostActions.js'
import NotFound from '../components/NotFound.jsx'
import Post from '../components/Post.jsx'

function mapStateToProps(state) {
  return {
    posts: state.postReducer.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onRemovePost: (id) => dispatch(PostActions.removePost(id))
  }
}

class PostPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!this.postExist(nextProps.params.id, nextProps.posts)) {
      browserHistory.push('/')
    }
  }

  postExist(id, posts) {
    return posts.find((item) => { return item.id == id })
  }

  render() {
    const post = this.postExist(this.props.params.id, this.props.posts)
    return (
      <div>
        { post &&
          <div>
            <Post link={false}
                  key={post.id}
                  id={post.id}
                  username={post.username}
                  title={post.title}
                  body={post.body}
                  image={post.image}
                  createdAt={post.created_at}
                  removePost={this.props.onRemovePost} />

            <Link to="/">Back</Link>
          </div>
        }
        { !post &&
          <NotFound />
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
