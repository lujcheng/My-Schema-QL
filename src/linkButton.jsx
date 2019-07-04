import React, { Component } from 'react'

class LinkButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: "0"
    }
  }
  
  handleClick = (e) => {
    e.preventDefault()
    if (this.state.opacity === "0") {
      this.setState({
        opacity: "1"
      })
    } else {
      this.setState({
        opacity: "0"
      })
    }
  } 

  render() {
    return (
      <>
        <div>
          <button className="button is-white is-large" onClick={e => this.handleClick(e)}><h4 className="title is-4">GET LINK</h4></button>
        </div>
        <div style={{opacity: this.state.opacity}}>
          <h6 className="title is-6">{this.props.socketURL}</h6>
        </div>
        <div>
          <button className="button is-white is-large"><h4 className="title is-4">TUTORIAL</h4></button>
        </div>
      </>
   )
  }
}

export default LinkButton