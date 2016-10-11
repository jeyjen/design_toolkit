import * as a from './action/handbook';

let attrs =
[
    {id: 1, name: '\\root\\name', description:'имя', product_type_id: 13, is_active: true},
    {id: 2, name: '\\root\\lastname', description:'фамилия', product_type_id: 13, is_active: true},
    {id: 3, name: '\\root\\middlename', description:'отчество', product_type_id: 13, is_active: true},
    {id: 4, name: '\\root\\birthday', description:'день рождения', product_type_id: 13, is_active: true},
    {id: 5, name: '\\root\\phone', description:'телефон', product_type_id: 13, is_active: true}
];

let filter_attrs = (text, product_type_id, is_select_all)=>
{
    if(is_select_all == true)
    {
        return attrs.filter((i)=>
        {
            return  i.product_type_id == product_type_id;
        });
    }
    if(text == "" || product_type_id == null)
    {
        return [];
    }
    return attrs.filter((i)=>
    {
        let s = text.toLowerCase();
        return  i.product_type_id == product_type_id &&(i.name.toLowerCase().indexOf(s) !== -1 || i.description.toLowerCase().indexOf(s) !== -1);
    });
}

const init_state = {};
init_state.sel_product_type_id = null;
init_state.product_types =
    [
        {id:13, title:"кэш"},
        {id:23, title:"кредитная карта"},
        {id:26, title:"карта без лимита"}
    ];
init_state.sel_attr_type_id = null;
init_state.attribute_types =
    [
        {id:1, title:"строка"},
        {id:2, title:"целое"},
        {id:3, title:"дата"},
        {id:4, title:"символ"},
    ];
init_state.select_all = false;
init_state.search_text =  "";
init_state.search_result = filter_attrs(init_state.search_text, init_state.sel_product_type_id, init_state.select_all);


const handbook = (state = init_state, action) => {
    switch (action.type) {
        case a.CHANGE_PRODUCT_TYPE:
        {
            state.sel_product_type_id = action.id;
        }break;
        case a.CHANGE_SEARCH_TEXT:
        {
            state.search_text = action.text;
        }
        case a.CHANGE_SELECT_ALL_FILTER:
        {
            state.select_all = action.value;
        }break;
        default:
            return state
    }

    state.search_result = filter_attrs(state.search_text, state.sel_product_type_id, state.select_all)
    return state;
}

export default handbook