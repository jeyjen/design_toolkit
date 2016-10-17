import store from '../../store';

export const c =
{
    SELECT_NODE:'SELECT_NODE'
}

export const a =
{
    select_node: (id) =>{
        store.dispatch(
            {
                type: c.SELECT_NODE,
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