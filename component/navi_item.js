import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Scrollbars } from 'react-custom-scrollbars';
import IconDrag from 'material-ui/svg-icons/editor/drag-handle';

import component from '../engine/component';

import Toolbar from './toolbar';
import Dia from './form/dia';
import Detail from './form/detail';
import Hierarchy from './form/node_hierarchy';

import ns from '../store/navigation_store';
import cs from '../store/common';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
injectTapEventPlugin();


class navigator extends component {
    constructor(props) {
        super(props);
        this.state =
        {
            view:{}
        }

        this.on_layout_changed = this.on_layout_changed.bind(this);
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
                <div>
                    <IconDrag className="drag_area"/>
                </div>
                <Scrollbars
                    autoHide
                    style={{height:this.state.view[i] * cs._row_height + 30}}
                >
                {this.get_view(i)}
                </Scrollbars>
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
                    onLayoutChange={this.on_layout_changed}
                >
                    {arr}
                </ResponsiveReactGridLayout>
            </section>
        );
    }
    
    on_layout_changed(layout, layouts)
    {
        cs.update_layouts(layout, layouts);
        this.state.view = {};
        layout.forEach((i)=>
        {
            this.state.view[i.i] = i.h;
        });

        this.upd();
    }

    get_view(name)
    {
        switch (name)
        {
            case 'dia': return <Dia/>;
            case 'detail': return <Detail/>;
            case 'hierarchy': return <Hierarchy/>;
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