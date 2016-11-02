import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'

import Post from '../components/Post.jsx'
import PostForm from '../components/PostForm.jsx'

import 'whatwg-fetch'
const BASE_URL = process.env.BASE_URL

import * as PostActions from '../actions/PostActions.js'

function mapDispatchToProps(dispatch) {
  return {
    onAddPost: (data) => dispatch(PostActions.addPost(data)),
    onRemovePost: (id) => dispatch(PostActions.removePost(id)),
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
    const { onAddPost } = this.props
    return (
      <button onClick={onAddPost} className="btn btn-default">Test</button>
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
    console.log("subbmit")
    this.props.fetchPosts()
  }

  render() {
    return(
      <Provider store={this.props.store}>
        <div>
          {this.props.posts.map((post) => {
            return <Post key={post.id} id={post.id} username={post.username} title={post.title} body={post.body} removePost={this.props.onRemovePost} />
          })}
          <PostForm  addPost={this.props.onAddPost.bind(this)} />
        </div>
      </Provider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
