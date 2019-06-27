import React, { Component } from 'react'
import Table from "./table.jsx"
import Draggable from 'react-draggable';
import LineTo, { SteppedLineTo } from 'react-lineto';
import ReactPanZoom from "@ajainarayanan/react-pan-zoom";

class Block extends React.PureComponent {
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


class Canvas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        ticks: 0,
        paused: false,
        dx: 0,
        dy: 0,
        zoom: 1
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

  zoomIn = () => {
    this.setState({
      zoom: this.state.zoom + 0.2
    });
  };
  
  zoomOut = () => {
    this.setState({
      zoom: this.state.zoom - 0.2
    });
  };
  
  onPan = (dx: number, dy: number) => {
    this.setState({
      dx,
      dy
    });
  }

  renderPanZoomControls = () => {
    return (
      <div>
        <div onClick={this.zoomIn} onScroll={this.zoomIn}>
          <span>+</span>
        </div>
        <div onClick={this.zoomOut}>
          <span>-</span>
        </div>
      </div>
    );
  };
  

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
            bounds="parent"
            axis="both"
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={null}
            grid={[5, 5]}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}
            zIndex='5'
            >
            <div>
              <p className="handle" style={{zIndex:'5'}} >Drag me</p>
            <Block
              className="stepped-A"
              top={`${y}px`}
              left={`${x}px`}>
                

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
          zIndex: 2
        }



    return (
      <div>
        <main>
          <div className="box" style={{height: '1000px', width: "100%", position: 'relative', overflow: 'auto', padding: '0', margin: '0'}}>
          <div style={{height: '1000px', width: '100%', padding: '10px'}}>

          {this.renderPanZoomControls()}
          <ReactPanZoom
            zoom={this.state.zoom}
            pandx={this.state.dx}
            pandy={this.state.dy}
            onPan={this.onPan}
            zIndex='0'
            width='100%'
            >
          
            {renderTables}
            
            <SteppedLineTo from="stepped-A" to="stepped-B" fromAnchor="bottom" toAnchor="top" {...style} />

            </ReactPanZoom>
            </div>
            </div>

        </main>
        
      </div>
    )
  }
}

export default Canvas