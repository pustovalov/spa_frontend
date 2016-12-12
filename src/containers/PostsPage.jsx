import React, { Component } from 'react'
import { connect } from 'react-redux'

import Post from '../components/Post.jsx'
import PostForm from '../components/PostForm.jsx'
import PaginatorSection from '../components/PaginatorSection.jsx'

import * as PostActions from '../actions/PostActions.js'

const mapDispatchToProps = {
  onAddPost: PostActions.addPost,
  onRemovePost: PostActions.removePost,
  onPaginate: PostActions.paginatePosts,
  onFilter: PostActions.filterPosts,
  onSearch: PostActions.searchPosts,
  fetchPosts: PostActions.fetchPosts
}

const mapStateToProps = (state) => ({
  posts: state.postReducer.posts,
  meta: state.postReducer.meta,
  order: state.postReducer.order
})

class PostsPage extends Component {
  constructor(props) {
    super(props)

    this.handleOnPaginate = this.handleOnPaginate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.props.fetchPosts()
  }

  handlePostSubmit() {
    this.props.fetchPosts()
  }

  handleOnPaginate (pageNumber) {
    this.props.onPaginate(pageNumber)
  }

  handleOnSort(option, e) {
    e.preventDefault()
    this.props.onFilter(option)
  }

  activeFilter(filter) {
    return filter == this.props.order ? "active" : ""
  }

  handleSubmit (e) {
    e.preventDefault()

    let query = this.refs.search.value.trim()
    this.props.onSearch(query)
  }

  render() {
    return(
      <div>
        <PostForm addPost={this.props.onAddPost.bind(this)} />

        <div className="navbar navbar-default mt-3">
          <div className="container-fluid">
            <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input className="form-control" ref="search" placeholder="Search by Title" />
              </div>
              <button type="submit" className="ml-1 btn btn-default">Submit</button>
            </form>

            <ul className="nav navbar-nav">
              <li className={`${ this.activeFilter("ASC") }`}>
                <a href="#" onClick={this.handleOnSort.bind(this, "ASC")}>Newest</a>
              </li>
              <li className={`${ this.activeFilter("DESC") }`}>
                <a href="#" onClick={this.handleOnSort.bind(this, "DESC")}>Eldest</a>
              </li>
            </ul>
          </div>
        </div>

        {
          this.props.posts.map((post) => {
            return <Post link={true}
                         key={post.id}
                         id={post.id}
                         username={post.username}
                         title={post.title}
                         body={post.body}
                         image={post.image}
                         createdAt={post.created_at}
                         removePost={this.props.onRemovePost} />
          })
        }

        {
          !this.props.posts.length &&
          <h3>
            Not found
          </h3>
        }

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
