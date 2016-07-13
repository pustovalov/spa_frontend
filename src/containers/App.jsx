import React, { Component } from 'react'
import Post from '../components/Post.jsx'
import PostForm from '../components/PostForm.jsx'

export default class App extends Component {
  render() {
    return(
      <div>
        <Post />
        <PostForm />
      </div>
    )
  }
}
