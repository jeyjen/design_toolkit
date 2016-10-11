import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-light-theme.css';
//import './style/common.css';
import './style/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import { Provider } from 'react-redux';
import store from './store';
import GoldenLayout from 'golden-layout/dist/goldenlayout';
import Generator from './component/generator';
import Dashboard from './component/dashboard';
import Templates from './component/templates';
import Order_attr_list from './component/handbook/order_attr_list';
import Order_attr_detail from './component/handbook/order_attr_detail';
import Schematic_Block_Diagram from './component/schematic_block_diagram';
import Toolbar from './component/toolbar';
import {a} from './reducer/action/toolbar';
import * as db from './operation/db';


injectTapEventPlugin();


ReactDOM.render(
    <MuiThemeProvider muiTheme = {getMuiTheme()}>
        <Toolbar store={store}/>
    </MuiThemeProvider>
    ,
    document.getElementById('toolbar')
);

var config = {
    content: [{
        type: 'column',
        content:[
        ]
    }]
};

function wrap_component (Component: Component, store) {
    class Wrapper extends React.Component {
        render () {
            return (
                <MuiThemeProvider muiTheme = {getMuiTheme()}>
                    <Component {...this.props}/>
                </MuiThemeProvider>
            )
        }
    }
    return Wrapper
}

let layout = new GoldenLayout(config);
layout.registerComponent( 'order_attr_list', wrap_component(Order_attr_list, store));
layout.registerComponent( 'schematic_block_diagram', wrap_component(Schematic_Block_Diagram, store));
layout.registerComponent( 'dashboard', wrap_component(Dashboard, store));

layout.on('initialised', (i)=>{

    //store.dispatch(a.change_view_state())

    layout.root.contentItems[0].addChild(
        {
            type:'row',
            content:[
                {
                    type:'react-component',
                    title:'справочник атрибутов',
                    component: 'order_attr_list',
                    props: { store: store}

                },
                {
                    type:'react-component',
                    title:'диаграмма',
                    component: 'schematic_block_diagram',
                    props: { store: store}
                }
            ]
        }
    );
});

layout.init();

db.drop_db();
//db.init_db()
//    .then(()=>
//    {
//        console.log("база данны инициализирована");
//    });



export default "";

