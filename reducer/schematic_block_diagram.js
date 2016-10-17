import * as a from './action/schematic_block_diagram';
import nodes from '../data/nodes';

const init_state = {};
init_state.nodes = nodes;
init_state.sel_node = "n_1";
init_state.root_element = "n_1";
const result_state = (state = init_state, action) => {
    switch (action.type) {
        case a.c.SELECT_NODE:
        {
            state.sel_node = action.id;
        }break;
        default:
            return state
    }
    return state;
}
export default result_state