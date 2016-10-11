import store from '../../store';

export const c =
{
    CHANGE_VIEW_STATE:'CHANGE_VIEW_STATE'
}

export const a =
{
    change_view_state: (name) =>{
        store.dispatch(
            {
                type: c.CHANGE_VIEW_STATE,
                view : name
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
