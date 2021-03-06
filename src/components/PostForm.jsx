import React, { Component } from 'react'
import { FormattedMessage, intlShape, injectIntl } from 'react-intl'
import { translations } from 'Translations'

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {username: '', title: '', body: '', image: '', submitAllowed: false}
    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeImage = this.handleChangeImage.bind(this)
  }

  handleChangeInput () {
    let allowed = false
    if (this.refs.username.value.trim() && this.refs.title.value.trim() && this.refs.body.value.trim()) {
      allowed = true
    }
    this.setState({submitAllowed: allowed})
  }

  handleChangeImage () {
    let file = this.refs.image.files[0]
    let reader = new FileReader()
    let url = reader.readAsDataURL(file)

    reader.onloadend = () => {
      this.setState({image: reader.result})
    }
  }

  addPost(obj){
    let data = JSON.stringify(obj)

    this.props.addPost(data)
  }

  handleSubmit (e) {
    e.preventDefault()
    let username = this.refs.username.value.trim()
    let title = this.refs.title.value.trim()
    let body = this.refs.body.value.trim()
    let image = this.state.image

    if (!title || !username || !body) {
      return
    }

    let post = {
      username: username,
      title: title,
      body: body,
      image: image
    }

    this.addPost(post)
  }

  render() {
    const {formatMessage} = this.props.intl;

    return(
      <div className="row">
        <div className="col-md-3">

          <h3>
            <FormattedMessage
              {...translations.add_new_comment}
            />
          </h3>

          <form className="commentForm" onSubmit={this.handleSubmit}>

            <div className="form-group">
              <input className="form-control"
                     type="text"
                     placeholder={formatMessage(translations.placeholder_user_name)}
                     ref="username"
                     onChange={this.handleChangeInput} />
            </div>
            <div className="form-group">
              <input type="text"
                     className="form-control"
                     placeholder={formatMessage(translations.placeholder_title)}
                     ref="title"
                     onChange={this.handleChangeInput} />
            </div>
            <div className="form-group">
              <input type="text"
                     className="form-control"
                     placeholder={formatMessage(translations.placeholder_body)}
                     ref="body"
                     onChange={this.handleChangeInput} />
            </div>
            <div className="form-group">
              <input type="file"
                     className="form-control"
                     ref="image"
                     accept="image/*"
                     onChange={this.handleChangeImage} />
            </div>
            <input type="submit" className={ "btn btn-default ac-submit" + (this.state.submitAllowed ? '' : ' disabled') } value={formatMessage(translations.add_comment)} />
          </form>
        </div>
      </div>
    )
  }
}

PostForm.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(PostForm)
