import * as a from './action/schematic_block_diagram';
import nodes from '../data/nodes';

const init_state = {};
init_state.nodes = nodes;
const result_state = (state = init_state, action) => {
    switch (action.type) {
        default:
            return state
    }
    return state;
}

export default result_state