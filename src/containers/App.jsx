import React, { Component } from 'react'
import Post from '../components/Post.jsx'
import PostForm from '../components/PostForm.jsx'

let posts = [
 { id: 1, name: 'name 11', description: 'description11' },
 { id: 2, name: 'name 2', description: 'description2' },
 { id: 3, name: 'name 3', description: 'description3' }
]

export default class App extends Component {
  render() {
    return(
      <div>
        <Post data={posts} />
        <PostForm />
      </div>
    )
  }
}
