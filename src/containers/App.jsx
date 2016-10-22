import React, { Component } from 'react'
import Post from '../components/Post.jsx'
import PostForm from '../components/PostForm.jsx'
import 'whatwg-fetch'
const BASE_URL = process.env.BASE_URL
const ENV = process.env.ENV

export default class App extends Component {
  componentWillMount() {
    this.getData()
  }

  getData() {
    fetch(BASE_URL + '/api/posts')
      .then(response => response.json())
      .then(response => {
        this.setState({posts: response.result})
      })
  }

  handlePostSubmit() {
    this.getData()
  }

  render() {
    return(
      <div>
        {this.state && this.state.posts.map((post) => {
          return <Post key={post.id} id={post.id} username={post.username} title={post.title} body={post.body} />
        })}
        <PostForm onPostSubmit={this.handlePostSubmit.bind(this)} />
      </div>
    )
  }
}
