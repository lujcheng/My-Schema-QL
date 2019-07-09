import React, { Component } from 'react'
import Table from "./table.jsx"
import Draggable from 'react-draggable';
import LineTo, { SteppedLineTo } from 'react-lineto';
import ReactPanZoom from "@ajainarayanan/react-pan-zoom";
import NewTable from './new-table.jsx'
import DropTables from './dropTables.jsx';


class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
        activeDrags: 0,
        ticks: 0,
        paused: false,
        dx: 0,
        dy: 0,
        zoom: 0.8
    }
    this.togglePause = this.togglePause.bind(this)
    this.onStart = this.onStart.bind(this)
    this.onStop = this.onStop.bind(this)
    this.startAnimation = this.startAnimation.bind(this)
    this.stopAnimation = this.stopAnimation.bind(this)

}

// react-draggable functions

  onStart(e) {
    e.stopPropagation()
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop(e) {
    e.stopPropagation()
    this.setState({activeDrags: --this.state.activeDrags});
  }

  // SVG line-to functions
// componentDidMount() {
//     this.startAnimation();
// }

// componentWillUnmount() {
//     this.stopAnimation();
// }

  startAnimation(e) {
    e.stopPropagation()
    const step = () => {
        this.setState(Object.assign({}, this.state, {
            ticks: this.state.ticks + 1,
        }));
        this.frame = requestAnimationFrame(step);
    };
    step();
  }

  stopAnimation(e) {
    e.stopPropagation()
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

// table handlers

  
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

  // react-pan-zoom
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
      <>
        <div className="zoom-control" onClick={this.zoomOut}>
          <i className="icon fas fa-search-minus is-medium"></i>
        </div>
        <div className="zoom-control" onClick={this.zoomIn}>
          <i className="icon fas fa-search-plus is-medium"></i>
        </div>
      </>
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
      .sort((a, b) => {
        if (tables[a].createdAt < tables[b].createdAt) {
          return 1
        } else {
          return -1
        }
      })
      .map((tableKey, index) => {
        const table = tables[tableKey]
        return (
          // .react-draggable
          <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            onStart={this.onStart, this.startAnimation}
            onStop={this.onStop, this.stopAnimation}
            key={tableKey}
            >
            <div style={{width: "fit-content"}}>
              <span className="handle is-paddingless" top={`${y}px`} left={`${x}px`}>
                <i id="drag-icon" className="icon fas fa-arrows-alt is-medium"></i>
              </span>
              <Table 
                x={x} 
                y={y} 
                tableID={index} 
                tableName={tableKey} 
                table={table} 
                renderTableChange={this.renderTableChange} 
                changeTableHeader={this.changeTableHeader} 
                changeTableTitle={this.changeTableTitle} 
                deleteRow={this.deleteRow} 
                createSVG={this.props.createSVG}
                />
            </div>
          </Draggable>
        )
        })
    const style = {
      delay: true,
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: 3,
      zIndex: -1
    }


    const renderSVG = Object.keys(this.props.svg).map(key => {
      if (this.props.svg[key] != null && typeof this.props.svg[key] === 'string') {
        return (
          <SteppedLineTo 
            from={key} 
            to={this.props.svg[key]} 
            fromAnchor="center" 
            toAnchor="center" 
            orientation="h"
            {...style}
          />
        )
      }
    })
    return (
      <div className="box">
        {this.renderPanZoomControls()}
        <NewTable renderNewTable={this.props.renderNewTable} />
        <ReactPanZoom
          zoom={this.state.zoom}
          pandx={this.state.dx}
          pandy={this.state.dy}
          onPan={this.onPan}
          width='100%'
          >
            {renderTables}
            {renderSVG}
            <DropTables dropTables={this.props.dropTables} test={this.props.tables.employees}/>
        </ReactPanZoom>
      </div>
    )
  }
}

export default Canvas