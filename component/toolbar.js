import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
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
import IconCancel from 'material-ui/svg-icons/content/clear';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Divider from 'material-ui/Divider';
import Flexbox from '../control/flexbox';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import * as a from '../reducer/action/toolbar';

class toolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state =
        {
            open: false,
            edit_mode: false
        };
        this.on_menu_tap = this.on_menu_tap.bind(this);
        this.on_request_close = this.on_request_close.bind(this);
        this.on_menu_item_tap = this.on_menu_item_tap.bind(this);
        this.on_add_tap = this.on_add_tap.bind(this);
        this.on_delete_tap = this.on_delete_tap.bind(this);
        this.on_save_tap = this.on_save_tap.bind(this);
        this.on_cancel_tap = this.on_cancel_tap.bind(this);
    }

    on_menu_tap(event)
    {
        // This prevents ghost click.
        event.preventDefault();

        this.state.open = true;
        this.setState(this.state);
    }

    on_add_tap(event)
    {
        //event.preventDefault();
        this.state.edit_mode = true;
        this.setState(this.state);

        // переводит в режим редактирования
    }

    on_delete_tap(event)
    {
        //event.preventDefault();


        // создает окно подтсверждения
        // после выполнения вызывает операцию удаления
    }

    on_save_tap(event)
    {
        //event.preventDefault();
        this.state.edit_mode = false;
        this.setState(this.state);
        // выполняет сохранение новой рабочей области в бд и сервере
        // переводит в нормальный режим
    }

    on_cancel_tap(event)
    {
        //event.preventDefault();
        this.state.edit_mode = false;
        this.setState(this.state);
    }


    on_menu_item_tap(item)
    {
        this.setState(this.state);
        this.props.on_menu_tab(item);
    }

    on_request_close()
    {
        this.setState({
            open: false,
        });
    };



    render() {

        const items = [
            <MenuItem key={1} value={1} primaryText="основная"  />,
            <MenuItem key={2} value={2} primaryText="логи" />,
            <MenuItem key={3} value={3} primaryText="robo"/>
        ];

        const s = {width:'200px'};
        let ws = null;
        if(this.state.edit_mode == true)
        {
            ws = <Flexbox
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="flex-start"
                marginLeft="7px"
                marginRight="7px"
            >
                <TextField
                    hintText="новое название"
                    fullWidth={true}
                />
                <IconButton
                    touch={true}
                    onTouchTap={this.on_save_tap}
                >
                    <IconDone/>
                </IconButton>
                <IconButton
                    touch={true}
                    onTouchTap={this.on_cancel_tap}
                >
                    <IconCancel/>
                </IconButton>
            </Flexbox>
        }
        else
        {
            ws = <Flexbox
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="flex-start"
                marginLeft="7px"
                marginRight="7px"
            >
                <IconButton
                    touch={true}
                    onTouchTap={this.on_add_tap}
                >
                    <IconAdd/>
                </IconButton>
                <IconButton
                    touch={true}
                    onTouchTap={this.on_delete_tap}
                >
                    <IconRemove/>
                </IconButton>
            </Flexbox>
        }


        return (
            <section>
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
                        <IconButton  touch={true} >
                            <IconGavel />
                        </IconButton>
                    </Flexbox>
                    <Flexbox
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="stretch"
                    >


                    </Flexbox>
                </Flexbox>
                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    {ws}
                    <Flexbox
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        marginLeft="7px"
                        marginRight="7px"
                    >
                        <SelectField
                            fullWidth={true}
                            value={null}
                            floatingLabelText="рабочее пространство"
                            floatingLabelFixed={true}
                        >
                            {items}
                        </SelectField>

                    </Flexbox>
                    <MenuItem
                        primaryText="генрация"
                        rightIcon={<ArrowDropRight />}
                        menuItems=
                            {[
                                <MenuItem style={s} key={"generator"} primaryText="генератор" checked={this.props.view.generator} insetChildren={true} onTouchTap={this.on_menu_item_tap}/>,
                                <MenuItem key={"copier"} primaryText="клонатор" checked={this.props.view.copier} insetChildren={true} onTouchTap={this.on_menu_item_tap}/>,
                                <Divider />,
                                <MenuItem key={"templates"} primaryText="шаблоны" checked={this.props.view.templates} insetChildren={true} onTouchTap={this.on_menu_item_tap}/>,
                                <MenuItem key={"template_detail"} primaryText="о шаблоне" checked={this.props.view.template_detail} insetChildren={true} onTouchTap={this.on_menu_item_tap}/>
                            ]}
                    />
                    <MenuItem
                        primaryText="справочник"
                        rightIcon={<ArrowDropRight />}
                        menuItems=
                            {[
                                <MenuItem style={s} key={"order_attr_list"} primaryText="атрибуты" checked={this.props.view.order_attr_list} insetChildren={true} onTouchTap={this.on_menu_item_tap}/>,
                                <MenuItem key={"order_attr_detail"} primaryText="об атрибуте" checked={this.props.view.order_attr_detail} insetChildren={true} onTouchTap={this.on_menu_item_tap}/>
                             ]
                            }
                    />
                    <Divider />
                    <MenuItem
                        primaryText="другие"
                        rightIcon={<ArrowDropRight />}
                        menuItems=
                            {[
                                <MenuItem
                                primaryText="начальная панель"
                                key={"dashboard"}
                                checked={this.props.view.dashboard}
                                insetChildren={true}
                                onTouchTap={this.on_menu_item_tap}/>
                            ]}
                    />
                </Drawer>
            </section>

        );
    }
}
/*
 <Popover
 open={this.state.open}
 anchorEl={this.state.anchorEl}
 anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
 targetOrigin={{horizontal: 'left', vertical: 'top'}}
 onRequestClose={this.on_request_close}
 >
 <Menu
 style={s}
 >

 </Menu>
 </Popover>
* */

function map_state_to_props (state, own_pros) {
    let prop = Object.assign({common:state.common}, state.toolbar);
    return prop;
}

function map_dispatch_to_props(dispatch, own_props){

    let s =
    {
        on_menu_tab(e)
        {
            let mark = e.dispatchMarker;
            let start = mark.indexOf('$');
            let end = mark.indexOf('//');
            dispatch(a.change_view_state(mark.substr(start + 1, end - start - 1)));
        }
    }
    return s;
}

export default connect(map_state_to_props, map_dispatch_to_props)(toolbar);