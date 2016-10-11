import React from 'react';
import ReactDOM from 'react-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {connect} from 'react-redux';


import autocomplete from 'jquery-ui/ui/widgets/autocomplete';

class dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount()
    {
    }

    render() {
        return (
            <h1>доска</h1>
        );
    }
}

function map_state_to_props (state, own_pros) {
    let s = {
        views: state.common.views,
        sel_view_id: state.common.sel_view_id
    }
    return s;
}

function map_dispatch_to_props(dispatch, own_props){
    let s = {
        on_view_changed(event, index, value){
            //dispatch(a.change_view(value));
        }
    }
    return s;
}

export default connect(map_state_to_props, map_dispatch_to_props)(dashboard);