import React from 'react'

export default class PaginatorLink extends React.Component {
  constructor(props) {
    super(props)

    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick (e) {
    e.preventDefault()
    this.props.onPaginatorLinkClick(this.props.pageNumber)
  }

  render() {
    return(
      <a href={`#${this.props.pageNumber}`} onClick={this.handleOnClick}>
        {this.props.pageNumber}
      </a>
    )
  }
}
