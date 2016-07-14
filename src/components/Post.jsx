import React, { Component } from 'react'

export default class App extends Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(
            React.PropTypes.shape({
              id: React.PropTypes.number.isRequired,
              name: React.PropTypes.string.isRequired,
              description: React.PropTypes.string.isRequired
            }))
  };



  render() {
    return(
      <div>
        {this.props.data.map((value) => {
          return (
            <div key={value.id}>
              <h3>
                { value.name }
              </h3>
              <p>
                { value.description }
              </p>
            </div>
          )
        })}
      </div>
    )
  }
}
