import api from '../provider/toolkit_provider';
import cs from '../store/common';
//import ps from '../store/example_store';
//import a_sr from '../store/attribute_store';


export default
{
    load_nodes()
    {
        
        if(api.is_alive())
        {
            api.load()
        }
        
        api.load()
            .then((r)=>
            {
                cs.set_nodes(r["nodes"]);
            })
            .catch((e)=>
            {
                alert("ошибка");
                console.log('при загрузке состава продуктов: "' + e + '"');
            });
    }
}
