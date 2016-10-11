import { combineReducers } from 'redux';
import constant from './constant';
import common from './common';
import handbook from './handbook';
import toolbar from './toolbar';
import schematic_block_diagram from './schematic_block_diagram';

const reducer = combineReducers({
    constant,
    common,
    toolbar,
    handbook,
    schematic_block_diagram
})

export default reducer;