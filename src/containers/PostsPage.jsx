import React, { Component } from 'react'
import { connect } from 'react-redux'

import Post from 'Post'
import PostForm from 'PostForm'
import PaginatorSection from 'PaginatorSection'

import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { translations } from 'Translations'

import * as PostActions from 'PostActions'

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
    const { formatMessage } = this.props.intl

    return(
      <div>
        <PostForm addPost={this.props.onAddPost.bind(this)} />

        <div className="navbar navbar-default mt-3">
          <div className="container-fluid">
            <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input className="form-control" ref="search" placeholder={formatMessage(translations.placeholder_search_by_title)} />
              </div>
              <button type="submit" className="ml-1 btn btn-default">
                <FormattedMessage
                  {...translations.submit}
                />
              </button>
            </form>

            <ul className="nav navbar-nav">
              <li className={`${ this.activeFilter("DESC") }`}>
                <a href="#" onClick={this.handleOnSort.bind(this, "DESC")}>
                  <FormattedMessage
                    {...translations.newest}
                  />
                </a>
              </li>
              <li className={`${ this.activeFilter("ASC") }`}>
                <a href="#" onClick={this.handleOnSort.bind(this, "ASC")}>
                  <FormattedMessage
                    {...translations.eldest}
                  />
                </a>
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

        {do {
          if (!this.props.posts.length) {
            <h3>
              Not found
            </h3>
          }
        }}

        {do {
          if (this.props.meta) {
            <PaginatorSection onPaginate={this.handleOnPaginate}
                              totalPages={this.props.meta.total_pages}
                              currentPage={this.props.meta.current_page} />
          }
        }}
      </div>
    )
  }
}

PostsPage.propTypes = {
  intl: intlShape.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PostsPage))
