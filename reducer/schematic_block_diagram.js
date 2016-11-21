import {c} from './action/schematic_block_diagram';
import data from '../data/nodes';

let nodes = new Map();

data.nodes.forEach((i)=>
{
    nodes.set(i['id'], i);
});

const init_state = {};
init_state.nodes = nodes;
init_state.sel_node_first = null;

const result_state = (state = init_state, action) => {
    switch (action.type) {
        case c.CHANGE_SELECTED_NODE:
        {

        }break

        default:
            return state
    }

    if(state.hasOwnProperty('trrrr'))
    {
        delete state['trrrr'];
    }
    else
    {
        state['trrrr'] = "1";
    }

    return state;
}

export default result_state