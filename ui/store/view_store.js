import EventEmitter from 'event-emitter-es6';
import tp from '../provider/toolkit_provider';

class view_store extends EventEmitter
{
    constructor()
    {
        super();

        this.event =
        {
            on_visual_struct_changed: 'on_visual_struct_changed'
        }

        this.root = "0";
        this.nodes = new Map();
        this.v_nodes = new Map();
        this.collapsed_nodes = new Map();

        tp.nodes.forEach((i)=>
        {
            this.nodes.set(i.id, i);
        });

        this._define_visual_struct();
    }

    _define_visual_struct()
    {
        debugger;
        this.v_nodes.clear();

        let stack = [];
        let level_stack = [];
        let level = 1;
        stack.push(this.root);
        level_stack.push(level);
        let x = 1;
        let y = 1;

        while (stack.length > 0)
        {
            let v_node = {};

            let n = this.nodes.get(stack.pop()); // получаем ноду по id
            let l = level_stack.pop();
            x = l;
            if(l == level)
            {
                y += 2;
            }
            else
            {
                y += 1;
            }
            level = l;
            v_node['id'] = n['id'];
            v_node['type'] = n['type'];
            v_node['name'] = n['name'];
            v_node['child'] = n['child'];
            v_node['next'] = n['next'];
            v_node['x'] = x;
            v_node['y'] = y;

            if (n["next"] == "")
            {
                if(stack.length > 0)// и тип не while
                {
                    v_node['next'] = stack[stack.length - 1]['id'];
                }
            }
            else
            {
                stack.push(n['next']);
                level_stack.push(l);
            }
            let expand_state = 0;// none, open, close
            if(n.hasOwnProperty("child") && n["child"] != null && n["child"] != "")
            {
                if(this.collapsed_nodes.has(n['id']))
                {
                    // отображать закрытой со значком +
                    expand_state = 2;
                }
                else
                {
                    // отображается открытым со значком -
                    stack.push(n["child"]);
                    level_stack.push(l + 1);
                    expand_state = 1;
                }
            }
            else
            {
                // отображается без значка раскрытия
                expand_state = 0;
            }
            v_node['expand_state'] = expand_state;

            this.v_nodes.set(v_node['id'], v_node);
        }

        this.emit(this.event.on_visual_struct_changed);
    }

    some()
    {
        this.is_sidebar_open = false;
        this.emit(this.event.on_sidebar_state_changed);
    }

}
export default new view_store();
 