import React, { Component } from 'react'
import Table from "./table.jsx"
import Draggable from 'react-draggable';
import LineTo, { SteppedLineTo } from 'react-lineto';

class Block extends Component {
  render() {
    const { top, left, color, className } = this.props;
    const style = { top, left, backgroundColor: color, height: "100px"};  

      return (
          <div
              className={`block ${className} handle`}
              style={style}
              onMouseOver={this.props.onMouseOver}
              onMouseOut={this.props.onMouseOut}
          >
              {this.props.children}
          </div>
      );
  }
}

class Rock extends Component {
  render() {
    let style = {backgroundColor:"#00f", height:"100px"}
    return (
      <div className="block stepped-A" style={{backgroundColor:"#00f", height:"100px"}}> 
      </div>
    )
  }
}


class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ticks: 0,
        paused: false,
    };
    this.togglePause = this.togglePause.bind(this);
}

componentDidMount() {
    this.startAnimation();
}

componentWillUnmount() {
    this.stopAnimation();
}

startAnimation() {
    const step = () => {
        this.setState(Object.assign({}, this.state, {
            ticks: this.state.ticks + 1,
        }));
        this.frame = requestAnimationFrame(step);
    };
    step();
}

stopAnimation() {
    cancelAnimationFrame(this.frame);
}

togglePause() {
    const paused = !this.state.paused;
    if (paused) {
        this.stopAnimation();
    } else {
        this.startAnimation();
    }
    this.setState(Object.assign({}, this.state, { paused }));
}

renderPauseButton() {
    const text = this.state.paused ? 'Play' : 'Pause';
    return (
        <button onClick={this.togglePause}>{text}</button>
    );
}

// end of line-to
  
  deleteRow = (col, tableName) => {
    this.props.deleteRow(col, tableName)
  }

  renderTableChange = (tableName, val, col, row) => {
    this.props.renderTableChange(tableName, val, col, row)
  }

  changeTableHeader = (tableName, val, col) => {
    this.props.changeTableHeader(tableName, val, col)
  }

  changeTableTitle = (tableName, val, tableID) => {
    this.props.changeTableTitle(tableName, val, tableID)
  }
  

  render() {
    const ox = 300;
    const oy = 120;
    const r = 100;
  
    const t = this.state.ticks * Math.PI / 180;
  
    const x = Math.cos(t) * r + ox;
    const y = Math.sin(t) * r + oy;
    const tables = this.props.tables
    const renderTables = Object.keys(tables)
      .map((tableKey, index) => {
        const table = tables[tableKey]
        return (
          <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={null}
            grid={[5, 5]}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
            <div>
              <p className="handle" >Drag me</p>
            <Block
              className="stepped-A"
              top={`${y}px`}
              left={`${x}px`}
              color="#00f">

              <Table key={index} tableID={index} tableName={tableKey} table={table} renderTableChange={this.renderTableChange} changeTableHeader={this.changeTableHeader} changeTableTitle={this.changeTableTitle} deleteRow={this.deleteRow}/>

              </Block>
            </div>
        </Draggable>)
        })
        const style = {
          delay: true,
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 3,
          zIndex: 0
        }



    return (
      <div>
        <main>
          {renderTables}
          <div className="box" style={{height: '500px', width: '500px', position: 'relative', overflow: 'auto', padding: '0'}}>
          <div style={{height: '1000px', width: '1000px', padding: '10px'}}>
          <Draggable
            bounds="parent"
            axis="both"
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={null}
            grid={[5, 5]}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
           <div className="handle">
           <Block
                    className=" handle stepped-A"
                    top={`${y}px`}
                    left={`${x}px`}
                    color="#00f"
                    >
                    <div className="handle">
                    A
                    </div>
                    </Block>
                    </div>
        </Draggable>
       
        <Draggable
            bounds="parent"
            axis="both"
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={null}
            grid={[5, 5]}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
            <div className="handle"> 
            <Block
                    className="stepped-B"
                    top={`${y}px`}
                    left={`${x}px`}
                    color="#00f"
                    >
                     <div>
                     B
                    </div>
                    </Block>  
                    </div>
        </Draggable>
            
            <SteppedLineTo from="stepped-A" to="stepped-B"
                                fromAnchor="bottom" toAnchor="top" {...style} />
                                </div>
                                </div>
        </main>
        
      </div>
    )
  }
}

export default Canvas