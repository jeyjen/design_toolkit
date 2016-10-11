import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import getMuiTheme from '../../node_modules/material-ui/styles/getMuiTheme';
import MuiThemeProvider from '../../node_modules/material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Flexbox from '../../control/flexbox';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from '../../node_modules/material-ui/svg-icons/navigation/more-vert';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import * as a from '../../reducer/action/handbook';

class generator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const items = this.props.product_types.map((i)=>
        {
            return <MenuItem key={i.id} value={i.id} primaryText={i.title} />;
        });


        const iconButtonElement = (
            <IconButton
                touch={false}
            >
                <MoreVertIcon color={grey400} />
            </IconButton>
        );

        const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem>детали</MenuItem>
                <MenuItem>в архив</MenuItem>
                <MenuItem>удалить</MenuItem>
            </IconMenu>
        );

        const si = this.props.search_result.map((i)=>
        {
            return(
                <ListItem
                    rightIconButton={rightIconMenu}
                >
                    <u>{i.name}</u><br/>
                    <b>{i.description}</b>
                </ListItem>
            )
        });

        let subheader = "ничего не найдено";
        if(this.props.search_result.length > 0)
        {
            subheader = "совпадений " + this.props.search_result.length;
        }

        return (
                <Flexbox
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="stretch"
                    margin="7px"
                >
                    <SelectField
                        value={this.props.sel_product_type_id}
                        floatingLabelText="тип продукта"
                        floatingLabelFixed={true}
                        hintText="..."
                        fullWidth={true}
                        onChange={this.props.on_product_type_changed}>
                        {items}
                    </SelectField>
                    <Toggle
                        label="все"
                        labelPosition="right"
                        toggled = {this.props.select_all}
                        onToggle = {this.props.on_select_all_filter_changed}
                        disabled={this.props.sel_product_type_id == null}
                    />

                    <TextField
                        hintText="..."
                        floatingLabelText="поиск"
                        floatingLabelFixed={true}
                        fullWidth={true}
                        value={this.props.search_text}
                        onChange={this.props.on_search_text_changed}
                        disabled={this.props.sel_product_type_id == null || this.props.select_all == true}
                    />
                    <List
                        onKeyboardFocus={this.props.on_attr_focused}
                    >
                        <Subheader>{subheader}</Subheader>
                        {si}
                    </List>
                </Flexbox>

        );
    }
}


function map_state_to_props (state, own_pros) {
    let prop = Object.assign({common:state.common}, state.handbook);

    return prop;
}

function map_dispatch_to_props(dispatch, own_props){
    let s =
    {

        on_product_type_changed(event, index, value)
        {
            dispatch(a.change_product_type(value));
        },
        on_search_text_changed(event, value)
        {
            dispatch(a.change_search_text(value));
        },
        on_attr_focused(event, isKeyboardFocused)
        {

        },
        on_select_all_filter_changed(event, value)
        {
            dispatch(a.select_all_filter(value));
        }
    }
    return s;
}

export default connect(map_state_to_props, map_dispatch_to_props)(generator);