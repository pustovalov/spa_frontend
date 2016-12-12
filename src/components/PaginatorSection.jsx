import React from 'react'
import _ from 'lodash/util'

import PaginatorLink from '../components/PaginatorLink.jsx'

export default class PaginatorSection extends React.Component {
  constructor(props) {
    super(props)

    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick (pageNumber) {
    this.props.onPaginate(pageNumber)
  }

  render() {
    return(
      <div>
        { this.props.totalPages > 1 &&
          <ul className="pagination">
            {_.range(1, this.props.totalPages).map((i) => {
              return <li key={i} className={ i == this.props.currentPage ? "active" : "" }>
                        <PaginatorLink pageNumber={i}
                                       onPaginatorLinkClick={this.handleOnClick}
                        />
                     </li>
            })}
          </ul>
        }
      </div>
    )
  }
}
