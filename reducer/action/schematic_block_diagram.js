import store from '../../store';

export const c =
{
    CHANGE_SELECTED_NODE:'CHANGE_SELECTED_NODE'
};

export const a =
{
    change_selected_node: (id) =>{
        store.dispatch(
            {
                type: c.CHANGE_SELECTED_NODE,
                id : id
            }
        );
    },

    prom: (name) =>{
        let prom = new Promise((ok, err)=>{
            // some calculate
        });

        prom.then(()=>
            {
                store.dispatch(
                    {
                        type: c.CHANGE_VIEW_STATE,
                        view : name
                    }
                );
            },
            ()=>
            {

            });
    }
}