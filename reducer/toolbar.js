import {c} from './action/toolbar';

const init_state = {};
init_state.layout = null;
init_state.view =
{
    order_attr_detail: true,
    order_attr_list:true,
    dashboard:true,
    generator:true,
    copier:false,
    templates:false,
    template_detail: false
};

init_state.sel_work_space = "default";


const toolbar = (state = init_state, action) => {
    switch (action.type) {
        case c.CHANGE_VIEW_STATE:
        {
            state.view[action.view] = !state.view[action.view];
        }break;
        default:
            return state
    }

    return state;
}

export default toolbar