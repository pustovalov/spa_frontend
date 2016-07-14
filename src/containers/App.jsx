import React, { Component } from 'react'
import Post from '../components/Post.jsx'
import PostForm from '../components/PostForm.jsx'

let posts = [
 { id: 1, name: 'name 1', description: 'description11' },
 { id: 2, name: 'name 2', description: 'description2' },
 { id: 3, name: 'name 3', description: 'description3' }
]

export default class App extends Component {
  render() {
    return(
      <div>
        {posts.map((post) => {
          return <Post key={post.id} id={post.id} name={post.name} description={post.description} />
        })}
        <PostForm />
      </div>
    )
  }
}
