import React from 'react'
import { connect } from 'react-redux'
import serialize from 'form-serialize'

import * as <%= pascalEntityName %>Actions from '<%= pascalEntityName %>Actions'

class <%= pascalEntityName %>Page extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
})


const mapStateToProps = state => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(<%= pascalEntityName %>Page)
