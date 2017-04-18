import React from 'react';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import component from '../engine/component';


// stores
import ns  from '../store/navigation_store';

class toolbar extends component {

    constructor(props) {
        super(props);
        this.state =
        {
            value: 1,
            open: false
        }
        this.on_menu_tap = this.on_menu_tap.bind(this);
        this.on_sidebar_request = this.on_sidebar_request.bind(this);
        this.on_menu_item_tap = this.on_menu_item_tap.bind(this);
        this.on_contour_changed = this.on_contour_changed.bind(this);
    }

    handleChange = (event, index, value) => this.setState({value})

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

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    render() {
        return (
            <Toolbar style={{position:'fixed', top:0, left:0, width:'100%', zIndex:999}}>
                <ToolbarGroup firstChild={true}>
                    <FlatButton
                        onTouchTap={this.handleTouchTap}
                        label="вид"
                    />
                    <Popover
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.handleRequestClose}
                    >
                        <Menu>
                            <MenuItem primaryText="Refresh" />
                            <MenuItem primaryText="Help &amp; feedback" />
                            <MenuItem primaryText="Settings" />
                            <MenuItem primaryText="Sign out" />
                        </Menu>
                    </Popover>
                </ToolbarGroup>
                <ToolbarGroup>

                    <IconMenu
                        iconButtonElement={
                          <IconButton touch={true}>
                            <NavigationExpandMoreIcon />
                          </IconButton>
                        }
                    >
                        <MenuItem primaryText="Download" />
                        <MenuItem primaryText="More Info" />
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
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