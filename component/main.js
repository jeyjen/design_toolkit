import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Scrollbars } from 'react-custom-scrollbars';
import IconDrag from 'material-ui/svg-icons/editor/drag-handle';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconSetting from 'material-ui/svg-icons/action/settings';
import IconView from 'material-ui/svg-icons/action/view-week';


import component from '../engine/component';

import Toolbar from './toolbar';
import NaviItem from './navi_item';
import Dia from './form/dia';
import Detail from './form/detail';
import Hierarchy from './form/node_hierarchy';

import ns from '../store/navigation_store';
import cs from '../store/common';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
injectTapEventPlugin();

let view = {};
view['dia'] = {main:Dia, setting:null};
view['detail'] = {main:Detail, setting:null};
view['hierarchy'] = {main:Hierarchy, setting:null};

class navigator extends component {
    constructor(props) {
        super(props);
        this.state =
        {
            is_main_view:{}
        }

        for(let key in view)
        {
            this.state.is_main_view[key] = true;
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

        cs._views.forEach((type)=>
        {
            let title = cs._titles.get(type);

            let icon = null;
            let Content = null;
            if(this.state.is_main_view[type])
            {
                Content = this.get_main(type);
                if(this.is_has_setting_view(type))
                {
                    icon = <IconButton><IconSetting/></IconButton>;
                }
            }
            else
            {
                Content = this.get_setting(type);
                icon = <IconButton><IconView/></IconButton>;
            }
            
            let v =
                <div key={type} style={style}>
                    <AppBar
                        title={title}
                        className="drag_area"
                        iconElementLeft={icon}
                        iconElementRight={
                        <IconMenu
                            iconButtonElement={
                            <IconButton><MoreVertIcon /></IconButton>
    }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        >
                            <MenuItem primaryText="закрыть" />
                        </IconMenu>
                        }
                    />
                        <NaviItem >
                        <Content/>
                    </NaviItem>
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
        this.upd();
    }

    get_main(type)
    {
        return view[type].main;
    }

    get_setting(type)
    {
        return view[type].setting;
    }

    is_has_setting_view(type)
    {
        return view[type] !== null;
    }


    
}
export default navigator;

//<img className="drag_area" src={'../img/ico/drag.svg'} width={20} height={20}/>

/*
 <Viewport>
 {view}
 </Viewport>
* */