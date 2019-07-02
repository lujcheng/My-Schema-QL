import React, { Component } from 'react'

class LinkButton extends Component {
  
  renderLink = () => {
    return <div>{this.props.socketURL}</div>
  } 

  render() {
    return (
      <div>
        <button className="button is-white is-large" >GET LINK</button>
      </div>
   )
  }
}

export default LinkButton