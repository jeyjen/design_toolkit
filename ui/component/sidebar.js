import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from 'material-ui/Drawer';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import IconAdd from 'material-ui/svg-icons/content/add';
import IconRemove from 'material-ui/svg-icons/content/remove';
import IconGavel from 'material-ui/svg-icons/action/gavel';
import IconDone from 'material-ui/svg-icons/action/done';
import IconClear from 'material-ui/svg-icons/content/clear';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import Flexbox from '../control/flex';

import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import component from '../engine/component';

// stores
import ns  from '../store/navigation_store';

class sidebar extends component {

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

        return (
            <Drawer
                docked={false}
                width={300}
                open={ns.is_sidebar_open}
                onRequestChange={()=>{ns.sidebar_close()}}
            >
                <Menu
                    desktop={true}
                    onItemTouchTap={this.on_menu_item_tap}
                >
                    <MenuItem
                        primaryText="генерация"
                        key={"product"}
                        checked={false}
                    />
                </Menu>
            </Drawer>
        );
    }
}





export default sidebar;