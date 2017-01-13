import EventEmitter from 'event-emitter-es6';

let fake_data =
    [
        {id:"0", type:3, next: "", child: "1", name:"root" },
        {id:"1", type:3, next: "", child: "2", name:"контекст order" },
        {id:"2", type:3, next: "10", child: "3", name:"контекст generate" },
        {id:"3", type:1, next: "5", child: "4", name:"атрибуты не загружены" },
        {id:"4", type:4, next: "", child: "", name:"загрузить атрибуты из БД" },
        {id:"5", type:4, next: "6", child: "", name:"копировать шаблон" },
        {id:"6", type:4, next: "7", child: "", name:"установить переданные значения" },
        {id:"7", type:6, next: "", child: "8", name:"заполнить атрибуты заявки" },
        {id:"8", type:4, next: "9", child: "", name:"заполнить параметры продукта" },
        {id:"9", type:4, next: "", child: "", name:"заполнить параметры клиента" },
        {id:"10", type:3, next: "11", child: "", name:"контекст order" },
        {id:"11", type:3, next: "", child: "", name:"контекст template" },
    ]

class view_store extends EventEmitter
{
    constructor()
    {
        super();

        this.e =
        {
            on_visual_struct_changed: 'on_visual_struct_changed',
            on_selected_set_updated: 'on_selected_set_updated'
        }

        this.root = "0";
        this.nodes = new Map();
        this.v_nodes = new Map();
        this.refs = [];
        this.collapsed_nodes = new Map();
        this.types = new Map();
        this.selected_nodes = new Set();

        // initialization
        this.types.set(1, "if");
        this.types.set(2, "else");
        this.types.set(3, "sel");
        this.types.set(4, "op");
        this.types.set(5, "call");
        this.types.set(6, "while");
        this.types.set(7, "and");
        this.types.set(8, "or");
        this.types.set(9, "proc");
        fake_data.forEach((i)=>
        {
            this.nodes.set(i.id, i);
        });

        this.selected_nodes.add('4');

        this._define_visual_struct();
        this._define_refs();
    }

    _define_visual_struct()
    {
        this.v_nodes.length = 0;

        let stack = [];
        let level_stack = [];
        let level = 0;

        let x = 1;
        let y = 0;
        stack.push(this.root);
        level_stack.push(x);

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
            v_node['type'] = this.types.get(n['type']);
            v_node['name'] = n['name'];
            v_node['child'] = n['child'];
            v_node['next'] = n['next'];
            v_node['x'] = x;
            v_node['y'] = y;

            if (n["next"] === "")
            {
                if(stack.length > 0)// и тип не while
                {
                    v_node['next'] = stack[stack.length - 1];
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

        this.emit(this.e.on_visual_struct_changed);
    }
    _define_refs()
    {
        this.refs.length = 0;

        this.v_nodes.forEach((v, k, m)=>
        {
            if(v.child.length > 0)
            {
                let ch = this.v_nodes.get(v.child);
                this.refs.push({x1:v.x, y1:v.y, x2:ch.x, y2: ch.y});
            }

            if(v.next.length > 0)
            {
                let next = this.v_nodes.get(v.next);
                this.refs.push({x1:v.x, y1:v.y, x2:next.x, y2: next.y});
            }
        });
    }

    some()
    {
        this.is_sidebar_open = false;
        this.emit(this.event.on_sidebar_state_changed);
    }

    tap_node(id)
    {
        if(this.selected_nodes.has(id))
        {
            this.selected_nodes.delete(id);
        }
        else
        {
            this.selected_nodes.add(id);
        }
        this.emit(this.e.on_selected_set_updated);
    }

}
export default new view_store();
 