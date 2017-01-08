import React from 'react';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Sect from '../control/sect';

import component from '../engine/component';

// stores
import ns  from '../store/navigation_store';

class toolbar extends component {

    constructor(props) {
        super(props);
        this.state =
        {};
        this.on_menu_tap = this.on_menu_tap.bind(this);
        this.on_sidebar_request = this.on_sidebar_request.bind(this);
        this.on_menu_item_tap = this.on_menu_item_tap.bind(this);
        this.on_contour_changed = this.on_contour_changed.bind(this);
    }

    componentDidMount()
    {
        this.on(ns, ns.event.on_sidebar_state_changed);
    }


    componentWillUnmount()
    {
        this.off(ns, ns.event.on_sidebar_state_changed);
    }

    on_sidebar_request(v)
    {
        this.state.open = v;
        this.setState(this.state);
    }

    on_contour_changed(event, index, value)
    {
        cs.set_contour(value);
    }

    on_menu_item_tap(event, menu_item, idx)
    {
        cs.set_view(menu_item.key);
        this.state.open = false;
        this.setState(this.state);
    }
    on_menu_tap(event)
    {
        event.preventDefault();
        this.state.open = true;
        this.setState(this.state);
    }

    render() {

        let actions = null;
        // switch (cs.state.sel_view)
        // {
        //     case 'product':
        //     {
        //         actions = <IconButton
        //             onTouchTap={()=>{this.state.generate_conf_open = true; this.setState(this.state)}}
        //             disabled={ps.state.sel_product == null}
        //             touch={true}
        //         >
        //             <IconGavel/>
        //         </IconButton>;
        //     }break;
        //     case 'dashboard':
        //     {
        //
        //     }break;
        // }
        return (
            <Sect>
                <IconButton
                    onTouchTap={()=>{ns.sidebar_open()}}
                    touch={true} >
                    <MenuIcon />
                </IconButton>
            </Sect>

        );
    }


}

export default toolbar;


/*
 <Flexbox
 flexDirection="row"
 justifyContent="space-between"
 alignItems="flex-start"
 marginLeft="7px"
 marginRight="7px"
 >
 <Flexbox
 flexDirection="row"
 justifyContent="center"
 alignItems="stretch"
 >
 <IconButton
 onTouchTap={this.on_menu_tap}
 touch={true} >
 <MenuIcon />
 </IconButton>
 {actions}
 </Flexbox>

 </Flexbox>


* */