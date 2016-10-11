import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux'
import GoldenLayout from 'golden-layout/dist/goldenlayout';
import Generator from './generator';
import Dashboard from './dashboard';
import Templates from './templates';
import Order_attr_list from './handbook/order_attr_list';
import Order_attr_detail from './handbook/order_attr_detail';
import reducer from '../reducer/main';

let store = createStore(reducer);

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

//layout.registerComponent( 'templates', Templates);
//layout.registerComponent( 'generator', Generator);
layout.registerComponent( 'order_attr_list', wrap_component(Order_attr_list, store));
//layout.registerComponent( 'handbook_detail', Handbook_detail);
layout.registerComponent( 'dashboard', wrap_component(Dashboard, store));

layout.on('initialised', (i)=>{
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
                  title:'справочник атрибутов',
                  component: 'dashboard',
                  props: { store: store}
              }
            ]
        }
        );
});

layout.init();





//

export default layout;



