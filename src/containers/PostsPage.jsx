import React, { Component } from 'react'
import { connect } from 'react-redux'

import Post from '../components/Post.jsx'
import PostForm from '../components/PostForm.jsx'
import PaginatorSection from '../components/PaginatorSection.jsx'

import * as PostActions from '../actions/PostActions.js'

function mapDispatchToProps(dispatch) {
  return {
    onAddPost: (data) => dispatch(PostActions.addPost(data)),
    onRemovePost: (id) => dispatch(PostActions.removePost(id)),
    fetchPosts: (options) => dispatch(PostActions.fetchPosts(options))
  }
}

function mapStateToProps(state) {
  return {
    posts: state.postReducer.posts,
    meta: state.postReducer.meta
  }
}

class PostsPage extends Component {
  constructor(props) {
    super(props)

    this.handleOnPaginate = this.handleOnPaginate.bind(this)
  }

  componentWillMount() {
    this.props.fetchPosts()
  }

  handlePostSubmit() {
    this.props.fetchPosts()
  }

  handleOnPaginate (pageNumber) {
    let options = {
      page: pageNumber
    }

    this.props.fetchPosts(options)
  }

  render() {
    return(
      <div>
        <PostForm addPost={this.props.onAddPost.bind(this)} />
        {this.props.posts.map((post) => {
          return <Post link={true}
                       key={post.id}
                       id={post.id}
                       username={post.username}
                       title={post.title}
                       body={post.body}
                       removePost={this.props.onRemovePost} />
        })}
        {this.props.meta &&
          <PaginatorSection onPaginate={this.handleOnPaginate}
                            totalPages={this.props.meta.total_pages}
                            currentPage={this.props.meta.current_page} />
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage)
