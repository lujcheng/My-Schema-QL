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
          <button className="button is-white is-large" onClick={e => this.handleClick(e)}>GET LINK</button>
        </div>
        <div style={{opacity: this.state.opacity}}>
          {this.props.socketURL}
        </div>
        <div>
          <li><button className="button is-white is-large">TUTORIAL</button></li>
        </div>
      </>
   )
  }
}

export default LinkButton