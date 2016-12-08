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
  fetchPosts: PostActions.fetchPosts
}

const mapStateToProps = (state) => ({
  posts: state.postReducer.posts,
  meta: state.postReducer.meta,
  config: {
    page: state.postReducer.page,
    per: state.postReducer.per,
    order: state.postReducer.order
  }
})

class PostsPage extends Component {
  constructor(props) {
    super(props)

    this.handleOnPaginate = this.handleOnPaginate.bind(this)
  }

  componentWillMount() {
    this.props.fetchPosts(this.props.config)
  }

  handlePostSubmit() {
    this.props.fetchPosts(this.props.config)
  }

  handleOnPaginate (pageNumber) {
    this.props.onPaginate(pageNumber)
  }

  handleOnSort(option) {
    this.props.onFilter(option)
  }

  activeFilter(filter) {
    return filter == this.props.config.order ? "btn-primary" : ""
  }

  render() {
    return(
      <div>
        <PostForm addPost={this.props.onAddPost.bind(this)} />

        <div className="btn-group mt-2">
          <button type="button" className={`btn btn-default ${ this.activeFilter('ASC') }`} onClick={this.handleOnSort.bind(this, "ASC")}>Newest</button>
          <button type="button" className={`btn btn-default ${ this.activeFilter('DESC') }`} onClick={this.handleOnSort.bind(this, "DESC")}>Eldest</button>
        </div>

        {this.props.posts.map((post) => {
          return <Post link={true}
                       key={post.id}
                       id={post.id}
                       username={post.username}
                       title={post.title}
                       body={post.body}
                       createdAt={post.created_at}
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
