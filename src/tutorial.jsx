import React, { Component } from 'react'

class Tutorial extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }
    render() {
        return (
            <>
            {/* add is-active to modal to show */}
                <div className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head"><button className="delete" aria-label="close" onClick={this.handleClick}></button></header>
                        <section className="modal-card-body">
                        </section>
                    </div>
                </div>
        
            </>
        )
    }
  }
  
  export default Tutorial