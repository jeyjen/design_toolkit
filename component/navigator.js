import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';

import component from '../engine/component';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import ns from '../store/navigation_store';
import Dia from './form/dia';
import Detail from './form/detail';

injectTapEventPlugin();

class navigator extends component {
    constructor(props) {
        super(props);
        this.state =
        {
            value: 3
        }
    }

    handleChange = (event, index, value) => this.setState({value})

    componentDidMount() {
        this.on(ns, ns.event.on_view_changed);
    }

    componentWillUnmount() {
        this.off(ns, ns.event.on_view_changed);
    }
    render() {

        var layout = [
            {i: 'a', x: 0, y: 0, w: 16, h: 2},
            {i: 'b', x: 16, y: 0, w: 4, h: 10}
        ];

        let shadow = 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px';

        let style = {background:'#ffffff', boxShadow:shadow};
        var layouts = {lg:layout};


        return (
            <section>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={1} primaryText="All Broadcasts" />
                            <MenuItem value={2} primaryText="All Voice" />
                            <MenuItem value={3} primaryText="All Text" />
                            <MenuItem value={4} primaryText="Complete Voice" />
                            <MenuItem value={5} primaryText="Complete Text" />
                            <MenuItem value={6} primaryText="Active Voice" />
                            <MenuItem value={7} primaryText="Active Text" />
                        </DropDownMenu>

                        <Badge
                            badgeContent={10}
                            secondary={true}
                            badgeStyle={{top: 20, right: 20}}
                        >
                            <IconButton tooltip="Notifications">
                                <NotificationsIcon />
                            </IconButton>
                        </Badge>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text="Options" />
                        <FontIcon className="muidocs-icon-custom-sort" />
                        <ToolbarSeparator />
                        <RaisedButton label="генерировать" primary={true} />
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
                <ResponsiveReactGridLayout className="layout" margin={[15,15]} layouts={layouts}
                                           breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                                           cols={{lg: 20, md: 8, sm: 4, xs: 1, xxs: 6}}>
                    <div key={'a'} style={style}>
                        <Dia style={{display:'flex'}}/>
                    </div>
                    <div  key={'b'}>
                        <Detail style={{height:'100%'}}/>
                    </div>
                </ResponsiveReactGridLayout>
            </section>
        );
    }
}
export default navigator;

/*
 <Viewport>
 {view}
 </Viewport>
* */