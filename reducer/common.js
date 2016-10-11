

const init_state =
{
    views:[
        {id:1, title: "доска"},
        {id:2, title: "заявки"},
        {id:3, title: "генерация"},
        {id:4, title: "справочник"},
        {id:5, title: "автотесты"}
    ],
    sel_view_id: 3
};

const common = (state = init_state, action) => {
    switch (action.type) {
        case "asd":
        {
            return state;
        }break;

        default:
            return state
    }
}

export default common