import React, { Component } from 'react'

class LinkButton extends Component {
  
  renderLink = (e) => {
    e.preventDefault()
    return <div>{this.props.socketURL}</div>
  } 

  render() {
    return (
      <div>
        <button className="button is-white is-large" onClick={this.renderLink()}>GET LINK</button>
      </div>
   )
  }
}

export default LinkButton