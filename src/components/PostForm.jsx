import React, { Component } from 'react'

export default class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {username: '', title: '', body: ''}
  }

  handleNameChange (e) {
    this.setState({username: e.target.value})
  }

  handleTitleChange (e) {
    this.setState({title: e.target.value})
  }

  handleBodyChange (e) {
    this.setState({body: e.target.value})
  }

  addPost(obj){
    let data = JSON.stringify(obj)

    this.props.addPost(data)
  }

  handleSubmit (e) {
    e.preventDefault()
    let username = this.state.username.trim()
    let title = this.state.title.trim()
    let body = this.state.body.trim()

    if (!title || !username || !body) {
      return
    }

    let post = {
      username: username,
      title: title,
      body: body
    }

    this.addPost(post)
  }

  render() {
    return(
      <div className="row">
        <div className="col-md-2">
          <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>

            <div className="form-group">
              <input className="form-control"
                     type="title"
                     value={this.state.username}
                     placeholder="Your username"
                     onChange={this.handleNameChange.bind(this)} />
            </div>
            <div className="form-group">
              <input type="title"
                     className="form-control"
                     value={this.state.title}
                     placeholder="Title"
                     onChange={this.handleTitleChange.bind(this)} />
            </div>
            <div className="form-group">
              <input type="title"
                     className="form-control"
                     value={this.state.body}
                     placeholder="Body"
                     onChange={this.handleBodyChange.bind(this)} />
            </div>
            <input type="submit" className="btn btn-default" value="Add comment" />
          </form>
        </div>
      </div>
    )
  }
}
