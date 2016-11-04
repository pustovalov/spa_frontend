import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'

import Post from '../components/Post.jsx'
import PostForm from '../components/PostForm.jsx'

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

class PostsPage extends Component {
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
      <div>
        {this.props.posts.map((post) => {
          return <Post link={true} key={post.id} id={post.id} username={post.username} title={post.title} body={post.body} removePost={this.props.onRemovePost} />
        })}
        <PostForm  addPost={this.props.onAddPost.bind(this)} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage)
