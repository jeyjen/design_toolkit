import EventEmitter from 'event-emitter-es6';
import uuid from 'uuid';

let fake_data =
    [
        {id:"0", type:3, next: "", children: ["1"], name:"root", description:"описание 1" },
        {id:"1", type:3, next: "", children: ["2"], name:"контекст order", description:"описание 2" },
        {id:"2", type:3, next: "10", children: ["3"], name:"контекст generate", description:"описание 3" },//
        {id:"3", type:1, next: "5", children: ["4"], name:"атрибуты не загружены", description:"описание 4" },
        {id:"4", type:4, next: "", children: [], name:"загрузить атрибуты из БД", description:"описание 5" },
        {id:"5", type:4, next: "6", children: [], name:"копировать шаблон", description:"описание 6" },
        {id:"6", type:4, next: "7", children: [], name:"установить переданные значения", description:"описание 7" },
        {id:"7", type:6, next: "", children: ["8"], name:"заполнить атрибуты заявки", description:"описание 8" },
        {id:"8", type:4, next: "9", children: [], name:"заполнить параметры продукта", description:"описание 9" },
        {id:"9", type:4, next: "", children: [], name:"заполнить параметры клиента", description:"описание 10" },
        {id:"10", type:3, next: "11", children: [], name:"контекст order", description:"описание 11" },
        {id:"11", type:3, next: "", children: [], name:"контекст template", description:"описание 12" }
    ]

class view_store extends EventEmitter
{
    constructor()
    {
        super();

        this.e =
        {
            on_visual_struct_changed: 'on_visual_struct_changed',
            on_selected_node_changed: 'on_selected_node_changed'
        }

        this.c =
        {
            type:
            {
                NONE: 0,
                IF: 1,
                ELSE: 2,
                SEL: 3,
                OP:4,
                CALL: 5,
                WHILE:6,
                AND:7,
                OR:8
            }
        };

        this.root = "0";
        this.nodes = new Map();
        this.parent = new Map();
        this.v_nodes = new Map();
        this.refs = [];
        this.collapsed_nodes = new Map();
        this.types = new Map();
        this.selected_node_id_1 = null;
        //this.selected_node_2 = null;

        // initialization
        this.types.set(0, "none");
        this.types.set(1, "if");
        this.types.set(2, "else");
        this.types.set(3, "sel");
        this.types.set(4, "op");
        this.types.set(5, "call");
        this.types.set(6, "while");
        this.types.set(7, "and");
        this.types.set(8, "or");
        this.types.set(8, "proc");
        fake_data.forEach((i)=>
        {
            this.nodes.set(i.id, i);
        });

        this._define_visual_struct();
    }

    _define_visual_struct()
    {
        this.v_nodes.clear();
        this.parent.clear();

        let stack = [];
        let level_stack = [];

        let x = 1;
        let y = 0;
        stack.push(this.root);
        level_stack.push(x);

        while (stack.length > 0)
        {
            let v_node = {};
            let n = this.nodes.get(stack.pop()); // получаем ноду по id
            let x = level_stack.pop();
            y += 1;
            //level = x;
            v_node.id = n.id;
            v_node.type = this.types.get(n.type);
            v_node.name = n.name;
            v_node.children = n.children;
            v_node.next = n.next;
            v_node.x = x;
            v_node.y = y;

            if (n.next === "")
            {
                if(stack.length > 0)// и тип не while
                {
                    v_node.next = stack[stack.length - 1];
                }
            }
            else
            {
                this.parent.set(n.next, n.id); // сохранение ссылки на предка

                stack.push(n.next);
                level_stack.push(x);
            }


            let expand_state = 0;// none, open, close
            if(n.children.length > 0)
            {
                if(this.collapsed_nodes.has(n['id']))
                {
                    // отображать закрытой со значком +
                    expand_state = 2;
                }
                else
                {
                    // отображается открытым со значком -
                    for(let i = 0; i < n.children.length; i++)
                    {
                        this.parent.set(n.children[i], n.id); // сохранение ссылки на предка

                        stack.push(n.children[i]);
                        level_stack.push(x + 1);
                    }
                    expand_state = 1;
                }
            }
            else
            {
                // отображается без значка раскрытия
                expand_state = 0;
            }
            v_node.expand_state = expand_state;
            this.v_nodes.set(v_node.id, v_node);
        }

        this._define_refs();
        this.emit(this.e.on_visual_struct_changed);
    }
    _define_refs()
    {
        this.refs.length = 0;

        this.v_nodes.forEach((v, k, m)=>
        {
            if(v.children.length > 0)
            {
                v.children.forEach((i)=>
                {
                    let ch = this.v_nodes.get(i);
                    this.refs.push({x1:v.x, y1:v.y, x2:ch.x, y2: ch.y});
                });
            }

            if(v.next.length > 0)
            {
                let next = this.v_nodes.get(v.next);
                this.refs.push({x1:v.x, y1:v.y, x2:next.x, y2: next.y});
            }
        });
    }

    get_node_by_id(id)
    {
        if(this.nodes.has(id))
        {
            return this.nodes.get(id);
        }
        return null;
    }

    select_node(id)
    {
        this.selected_node_id_1 = id;
        this.emit(this.e.on_selected_node_changed);
    }
    update_node(values)
    {
        if(values.hasOwnProperty('name'))
        {
            this.v_nodes.get(this.selected_node_id_1).name = values.name;
            this.nodes.get(this.selected_node_id_1).name = values.name;
        }
        if(values.hasOwnProperty('type'))
        {
            /*

                // если тип операция
                    // удалить всех потомков
                // иначе
                    // если тип процесс
                        // добавить потомка
                        // потомку добавить один следующий элемент
                    // если тип "И" или "ИЛИ"
                        // добавить недостоющее количество потомков до 2-х
                    // иначе
                        // добавить недостоющее количество потомков до 1-го
                // установить тип узла

            */

            let type = values.type;
            let node = this.get_node_by_id(this.selected_node_id_1);
            node.type = type;
            if(type === this.c.type.OP)
            {
                node.children.length = 0;
            }
            else if(type === this.c.type.AND || type === this.c.type.OR)
            {
                while(node.children.length < 2) // удаление излишков
                {
                    // добавлять потомков
                    this._add_child_to(node.id);
                }
            }
            else
            {
                while(node.children.length > 1) // удалить излишки
                {
                    node.children.pop();
                }
                if(node.children.length == 0)
                {
                    this._add_child_to(node.id);
                }
            }
            this._define_visual_struct();
        }
        this.emit(this.e.on_selected_node_changed);
    }

    add_child()
    {
        let new_id = this._add_child_to(this.selected_node_id_1);
        this._define_visual_struct();
        this.select_node(new_id);
    }
    _add_child_to(node_id)
    {
        /*

         // получить объект выбранного узла
         // если узел уже имеет потомков
         // новому элементу добавить ссылку следующего узла на первого потомка выбранного узла
         // выбранному узлу добавить первым элемент в список дочерних
         // установить новый узел как выбранный

         */

        let id = uuid.v1();
        let sel_node = this.get_node_by_id(node_id);
        let next = "";
        if(sel_node.children.length == 0 || (sel_node.type === this.c.type.AND || sel_node.type === this.c.type.OR))
        {
            sel_node.children.push(id);
        }
        else
        {
            next = sel_node.children[0];
            sel_node.children[0] = id;
        }

        this.nodes.set(id, {id: id, type:0, next: next, children: [], name:"" });
        return id;
    }

    add_next()
    {
        let new_id = this._add_next_to(this.selected_node_id_1);
        this._define_visual_struct();
        this.select_node(new_id);
    }
    _add_next_to(node_id)
    {
        /*

         // получить объект выбраного узла
         // установить новому объекту ссылку следующего узла значением выбранного узла
         // установить новому узлу ссылку следующего узла идентификатором нового узла
         // установить выбранным узлом новый узел

         */

        let id = uuid.v1();
        let sel_node = this.get_node_by_id(node_id);
        this.nodes.set(id, {id:id, type:0, next: sel_node.next, children: [], name:"" });
        sel_node.next = id;
        return id;
    }
    delete_node()
    {
        /*

            // получить объект предка
            // получить объект выбранного узла
            // предку установить ссылку следующего узла значением следующего узла выбранного объекта
            // удалить узел из коллекции
            // установить предка выбранным узлом

        */

        let node = this.get_node_by_id(this.selected_node_id_1);
        let parent_id = this.parent.get(node.id);
        let parent = this.get_node_by_id(parent_id);
        if(parent.next === node.id)
        {
            parent.next = node.next;
        }
        else
        {
            if(node.next === "")
            {
                parent.children.shift();
            }
            else
            {
                parent.children[0] = node.next;
            }
        }
        this.nodes.delete(node.id);
        this._define_visual_struct();
        this.select_node(parent_id);
    }

}
export default new view_store();