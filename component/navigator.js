import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Scrollbars } from 'react-custom-scrollbars';

import DragIcon from 'material-ui/svg-icons/editor/drag-handle';

import component from '../engine/component';

import Toolbar from './toolbar';
import Dia from './form/dia';
import Detail from './form/detail';

import ns from '../store/navigation_store';
import cs from '../store/common';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
injectTapEventPlugin();


let view = {};
view['dia'] = <Dia/>;
view['detail'] = <Detail/>;

class navigator extends component {
    constructor(props) {
        super(props);
        this.state =
        {}
    }

    componentDidMount() {
        this.on(ns, ns.event.on_view_changed);
    }

    componentWillUnmount() {
        this.off(ns, ns.event.on_view_changed);
    }
    render() {
        let shadow = 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px';

        let style = {background:'#ffffff', boxShadow:shadow};

        let arr = [];

        cs._views.forEach((i)=>
        {
            let v = <div key={i} style={style}>
                <div className="drag_area">
                    <DragIcon/>
                </div>
                {view[i]}
            </div>
            arr.push(v);
        });
        

        return (
            <section>
                <Toolbar/>
                <ResponsiveReactGridLayout
                    className="layout"
                    margin={cs._margin}
                    layouts={cs._layouts}
                    //draggableCancel=".no_drag_aria"
                    draggableHandle=".drag_area"
                    rowHeight={cs._row_height}
                    breakpoints={cs._breakpoints}
                    cols={cs._cols}
                    onLayoutChange={(l, ls)=>{cs.update_layouts(l, ls); this.upd()}}
                >
                    {arr}
                </ResponsiveReactGridLayout>
            </section>
        );
    }

    get_view(name)
    {
        switch (name)
        {
            case 'dia': return <Dia/>;
            case 'detail': return <Detail/>
        }
    }
    
}
export default navigator;

//<img className="drag_area" src={'../img/ico/drag.svg'} width={20} height={20}/>

/*
 <Viewport>
 {view}
 </Viewport>
* */