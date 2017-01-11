import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Sect from '../control/sect';
import component from '../engine/component';

import ReactGridLayout from 'react-grid-layout';

class resize extends component {

    constructor(props) {
        super(props);
        this.state =
        {};
    }
    componentDidMount()
    {}
    componentWillUnmount()
    {}
    render() {

        var layout = [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}
        ];
        return (
            <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                <div key={'a'}>a</div>
                <div key={'b'}>b</div>
                <div key={'c'}>c</div>
            </ReactGridLayout>
        );
    }
}
export default resize;


/*

DRAG AND DROP

 class resize extends component {

 constructor(props) {
 super(props);
 this.state =
 {};
 }
 componentDidMount()
 {}
 componentWillUnmount()
 {}
 render() {
 return (
 <div>
 <div key={"hello"} draggable="true" onDrag={this.onDrag} onDragOver={this.onDragOver} onDragStart={this.onDragStart} onDrop={this.onDrop}> pan 1 </div>
 <div draggable="true" > pan 2 </div>
 </div>
 );
 }

 onDrag(e)
 {
 e.persist();
 // Logic here
 console.log('on_drag');
 console.log(arguments);
 }

 onDragOver(e)
 {
 e.persist();
 // Logic here
 console.log('on_drag_over');
 console.log(arguments);
 }
 onDragStart(e)
 {
 e.persist();
 console.log('on_drag_start');
 console.log(arguments);
 //e.dataTransfer.setData('id', 'setTheId');
 //console.log('onDragStart');
 }
 onDrop(e)
 {
 console.log('on_drop');
 console.log(arguments);
 }
 }
 export default resize;
* */