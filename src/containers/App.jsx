import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'

import Post from '../components/Post.jsx'
import PostForm from '../components/PostForm.jsx'

import 'whatwg-fetch'
const BASE_URL = process.env.BASE_URL

//action
import addPost from '../actions/PostActions.js'

function mapDispatchToProps(dispatch) {
  return {
    onAddPostClick: () => dispatch(addPost)
  }
}

function mapStateToProps() {
  return {
    value: {}
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

const Test = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)


export default class App extends Component {
  constructor(props) {
    super(props)
  }
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
        <br/>
        <Provider store={this.props.store}>
          <Test />
        </Provider>
      </div>
    )
  }
}
