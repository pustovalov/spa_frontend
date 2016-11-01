import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'

import Post from '../components/Post.jsx'
import PostForm from '../components/PostForm.jsx'

import 'whatwg-fetch'
const BASE_URL = process.env.BASE_URL

import * as PostActions from '../actions/PostActions.js'

function mapDispatchToProps(dispatch) {
  return {
    onAddPostClick: () => dispatch(PostActions.addPost()),
    fetchPosts: () => dispatch(PostActions.fetchPosts())
  }
}

function mapStateToProps(state) {
  return {
    posts: state.postReducer.posts
  }
}

class Button extends Component {
  render() {
    const { onAddPostClick } = this.props
    return (
      <button onClick={onAddPostClick} className="btn btn-default">Test</button>
    )
  }
}


class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchPosts()
  }

  handlePostSubmit() {
    this.props.fetchPosts()
  }

  render() {
    return(
      <Provider store={this.props.store}>
        <div>
          {this.props && this.props.posts.map((post) => {
            return <Post key={post.id} id={post.id} username={post.username} title={post.title} body={post.body} />
          })}
          <PostForm onPostSubmit={this.handlePostSubmit.bind(this)} />
        </div>
      </Provider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
