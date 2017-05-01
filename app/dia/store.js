import EventEmitter from 'event-emitter-es6';
import uuid from 'uuid';

let fake_data =
    [
        {id:"0", type:10, next: "", children: ["1"], name:"process", description:"описание 0" },
        {id:"1", type:4, next: "2", children: ["3"], name:"selector 1", description:"описание 1" },
        {id:"2", type:4, next: "", children: ["4"], name:"selector 2", description:"описание 2" },
        {id:"3", type:1, next: "5", children: [], name:"operation 3", description:"описание 3" },
        {id:"4", type:1, next: "", children: [], name:"operation 4", description:"описание 4" },

        // if
        {id:"5", type:2, next: "7", children: ["6"], name:"if 5", description:"описание 5" },
        {id:"6", type:1, next: "", children: [], name:"operation 6", description:"описание 6" },

        // if else
        {id:"7", type:3, next: "10", children: ["8", "9"], name:"ifelse 7", description:"описание 7" },
        {id:"8", type:1, next: "", children: [], name:"operation 8", description:"описание 8" },
        {id:"9", type:1, next: "", children: [], name:"operation 9", description:"описание 9" },

        // while
        {id:"10", type:5, next: "13", children: ["11"], name:"while 10", description:"описание 10" },
        {id:"11", type:1, next: "12", children: [], name:"operation 11", description:"описание 11" },
        {id:"12", type:1, next: "", children: [], name:"operation 12", description:"описание 12" },

        // command
        {id:"13", type:6, next: "14", children: [], name:"command 13", description:"описание 13" },

        // request
        {id:"14", type:7, next: "15", children: [], name:"request 14", description:"описание 14" },

        // and
        {id:"15", type:8, next: "19", children: ["16", "17", "18"], name:"and 15", description:"описание 15" },
        {id:"16", type:1, next: "", children: [], name:"operation 16", description:"описание 16" },
        {id:"17", type:1, next: "", children: [], name:"operation 17", description:"описание 17" },
        {id:"18", type:1, next: "", children: [], name:"operation 18", description:"описание 18" },

        // or
        {id:"19", type:9, next: "", children: ["20", "21", "22"], name:"or 19", description:"описание 19" },
        {id:"20", type:1, next: "", children: [], name:"operation 20", description:"описание 20" },
        {id:"21", type:1, next: "", children: [], name:"operation 21", description:"описание 21" },
        {id:"22", type:1, next: "", children: [], name:"operation 22", description:"описание 22" }
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
                OPERATION: 1,
                IF: 2,
                IFELSE: 3,
                SELECTOR: 4,
                WHILE: 5,
                COMMAND: 6,
                REQUEST: 7,
                AND: 8,
                OR: 9,
                PROCESS: 10
            },
            expand_state:
            {
                NOTHING: 0,
                EXPANDED:1,
                COLLAPSED:2
            }
        };


        this.actual_root = "0"; // постоянная и не изменяемая переменная для данной структуры
        this.root = "0";
        this.nodes = new Map();
        this.hierarchy = new Map();
        this.visual_parents = [];
        this.parent = new Map();
        this.previous = new Map();
        this.v_nodes = new Map();
        this.refs = [];
        this._expanded = new Set();
        this.types = new Map();
        this.selected_node_id_1 = null;
        this.types = new Map();
        this.errors = new Map();

        // initialization
        this.types.set(this.c.type.NONE, "_none");
        this.types.set(this.c.type.OPERATION, "_operation");
        this.types.set(this.c.type.IF, "_if");
        this.types.set(this.c.type.IFELSE, "_ifelse");
        this.types.set(this.c.type.SELECTOR, "_selector");
        this.types.set(this.c.type.WHILE, "_while");
        this.types.set(this.c.type.COMMAND, "_command");
        this.types.set(this.c.type.REQUEST, "_request");
        this.types.set(this.c.type.AND, "_and");
        this.types.set(this.c.type.OR, "_or");
        this.types.set(this.c.type.PROCESS, "_process");

        fake_data.forEach((i)=>
        {
            this.nodes.set(i.id, i);
        });

        this._update_struct();
        this._define_visual_struct();
    }

    set project(id){
        if(this._prjs.has(id)){
            this._sel_prj = id;
            let prj = this._prjs.get(id);
            this.role = prj.root_role_id;
        }
    }
    get project(){
        return this._sel_prj;
    }

    /*
    * определяет всю структуру по списку nodes
    * */
    _update_struct()
    {
        this._define_inharitance_refs();
        this._check_archtectural_integration();
        this._define_hierarchy();
    }
    _define_visual_struct()
    {
        this._define_visual_hierarchy()
        this.v_nodes.clear();

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

            if (n.id !== this.root && n.next !== "")
            {
                stack.push(n.next);
                level_stack.push(x);
            }
            let expand_state = this.c.expand_state.NOTHING;// none, open, close
            if(n.children.length > 0)
            {
                if(this._expanded.has(n['id']))
                {
                    // отображается открытым со значком -
                    for(let i = n.children.length - 1; i >= 0; i--)
                    {
                        stack.push(n.children[i]);
                        level_stack.push(x + 1);
                    }

                    expand_state = this.c.expand_state.EXPANDED;
                }
                else
                {
                    // отображать закрытой со значком +
                    expand_state = this.c.expand_state.COLLAPSED;
                }
            }
            v_node.expand_state = expand_state;
            this.v_nodes.set(v_node.id, v_node);
        }

        this._define_refs();
        this.emit(this.e.on_visual_struct_changed);
    }
    /*
     * определяет отношения parent/previous
     * */
    _define_inharitance_refs()
    {
        this.parent.clear();
        this.previous.clear();

        this.nodes.forEach((v, k, m)=>
        {
            if(v.next !== "")
            {
                this.previous.set(v.next, v.id);
            }
            for(let i = 0; i < v.children.length; i++)
            {
                this.parent.set(v.children[i], v.id);
            }
        });
    }
    /*
    * проверяет корректность узла в структуре
    * */
    _check_archtectural_integration()
    {
        this.errors.clear();
        this.nodes.forEach((node, k, m)=>
        {
            //let node = this.get_node_by_id(id);
            switch (node.type)
            {
                case this.c.type.NONE:
                {
                    this._add_error(node.id, {text:"тип элемента не определен"});
                }break;
                case this.c.type.OPERATION:
                {
                    if(node.children.length > 0)
                    {
                        this._add_error(node.id, {text:"у операции не может быть дочерних узлов"});
                    }
                    for(let i = 0; i < node.children.length; i++)
                    {
                        this._add_error(node.children[i], {text:"недопустимый дочерний элемент для операции"});
                    }
                }break;
                case this.c.type.IF:
                {
                    if(node.children.length !== 1)
                    {
                        this._add_error(node.id, {text:"у if-условия допустим только 1 дочерний элемент"});
                    }
                    for(let i = 1; i < node.children.length; i++)
                    {
                        this._add_error(node.children[i], {text:"недопустимый дочерний элемент для if-условия"});
                    }
                }break;
                case this.c.type.IFELSE:
                {
                    if(node.children.length != 2)
                    {
                        this._add_error(node.id, {text:"у if-else-условия допустимо 2 дочерних элемент"});
                    }
                    for(let i = 2; i < node.children.length; i++)
                    {
                        this._add_error(node.children[i], {text:"недопустимый дочерний элемент для if-else-условия"});
                    }
                }break;
                case this.c.type.SELECTOR:
                {
                    if(node.children.length < 2)
                    {
                        this._add_error(node.id, {text:"узел selector должен содержать минимум два дочерних узла"});
                    }
                    for(let i = 0; i < node.children.length; i++)
                    {
                        if(this.get_node_by_id(node.children[i]).type !== this.c.type.IF)
                        {
                            this._add_error(node.children[i], {text:"дочерний узел selector-а должен иметь тим if-условия"});
                        }
                    }

                }break;
                case this.c.type.WHILE:
                {
                    if(node.children.length == 0)
                    {
                        this._add_error(node.id, {text:"узел while должен иметь мимнимум одного потомка"});
                    }
                    for(let i = 1; i < node.children.length; i++)
                    {
                        this._add_error(node.children[i], {text:"недопустимый дочерний элемент для узла while"});
                    }
                }break;
                case this.c.type.COMMAND:
                {
                    if( node.children.length > 0)
                    {
                        this._add_error(node.id, {text:"узел command не должен иметь дочерних узлов"});
                    }
                    for(let i = 0; i < node.children.length; i++)
                    {
                        this._add_error(node.children[i], {text:"недопустимый дочерний элемент для узла command"});
                    }
                }break;
                case this.c.type.REQUEST:
                {
                    if( node.children.length > 0)
                    {
                        this._add_error(node.id, {text:"узел request не должен иметь дочерних узлов"});
                    }
                    for(let i = 0; i < node.children.length; i++)
                    {
                        this._add_error(node.children[i], {text:"недопустимый дочерний элемент для узла request"});
                    }
                }break;
                case this.c.type.AND:
                {
                    if(node.children.length < 2)
                    {
                        this._add_error(node.id, {text:"узел and должен иметь минимум 2 дочерних узла"});
                    }
                }break;
                case this.c.type.OR:
                {
                    if(node.children.length < 2)
                    {
                        this._add_error(node.id, {text:"узел or должен иметь минимум 2 дочерних узла"});
                    }
                }break;
                case this.c.type.PROCESS:
                {
                    if(node.children.length == 0)
                    {
                        this._add_error(node.id, {text:"узел process должен иметь минимум 1 дочерний узел"});
                    }
                }break;
            }
        });


    }
    _define_hierarchy()
    {
        this.hierarchy.clear();
        let stack = [];
        let level_stack = [];
        let parent = [];
        parent.push("");

        let x = 1;
        stack.push(this.actual_root);
        level_stack.push(x);

        let prev_x = x;

        while (stack.length > 0)
        {
            let n = this.nodes.get(stack.pop());
            let x = level_stack.pop();
            if(x < prev_x)
            {
                parent.pop();
            }
            this.hierarchy.set(n.id, parent[parent.length - 1]);

            if (n.id !== this.actual_root && n.next !== "")
            {
                stack.push(n.next);
                level_stack.push(x);
            }
            if(n.children.length > 0)
            {
                parent.push(n.id);
                for(let i = n.children.length - 1; i >= 0; i--)
                {
                    stack.push(n.children[i]);
                    level_stack.push(x + 1);
                }
            }
            prev_x = x;
        }
    }
    _define_visual_hierarchy()
    {
        // пока предок находится
            // добавлить в конец списка предка.
        this.visual_parents.length = 0;
        let n = this.root;
        while(this.hierarchy.get(n) !== "")
        {
            n = this.hierarchy.get(n);
            this.visual_parents.unshift(n);
        }
    }
    _add_error(id, error)
    {
        if(this.errors.has(id))
        {
            let arr = this.errors.get(id);
            arr.push(error);
        }
        else
        {
            let arr = [error];
            this.errors.set(id, arr);
        }
    }
    _define_refs()
    {
        this.refs.length = 0;

        this.v_nodes.forEach((v, k, m)=>
        {
            v.children.forEach((i)=>
            {
                if(this.v_nodes.has(i))
                {
                    let ch = this.v_nodes.get(i);
                    this.refs.push({x1:v.x, y1:v.y, x2:ch.x, y2: ch.y});
                }
            });

            if(v.next !== "" && this.v_nodes.has(v.next))
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
    select_node(id)
    {
        this._select_node(id);
        this.emit(this.e.on_selected_node_changed);
    }
    _select_node(id)
    {
        this.selected_node_id_1 = id;
    }
    set_type(type)
    {
        this._set_type(this.selected_node_id_1, type);
        this._define_visual_struct();
    }
    _set_type(id, type)
    {
        let node = this.get_node_by_id(id);
        node.type = type;
        switch (type)
        {
            case this.c.type.NONE:
            {}break;
            case this.c.type.OPERATION:
            {}break;
            case this.c.type.IF:
            {
                if(node.children.length == 0)
                {
                    this._add_child_to(node.id, this.c.type.NONE);
                }
            }break;
            case this.c.type.IFELSE:
            {
                while(node.children.length < 2)
                {
                    this._add_child_to(node.id, this.c.type.NONE);
                }
            }break;
            case this.c.type.SELECTOR:
            {
                while(node.children.length < 2)
                {
                    this._add_child_to(node.id, this.c.type.IF);
                }
            }
                break;
            case this.c.type.WHILE:
            {
                if(node.children.length == 0)
                {
                    this._add_child_to(node.id);
                }
            }break;
            case this.c.type.COMMAND:
            {}break;
            case this.c.type.REQUEST:
            {}break;
            case this.c.type.AND:
            {
                while(node.children.length < 2)
                {
                    this._add_child_to(node.id, this.c.type.NONE);
                }
            }break;
            case this.c.type.OR:
            {
                while(node.children.length < 2)
                {
                    this._add_child_to(node.id, this.c.type.NONE);
                }
            }break;
            case this.c.type.PROCESS:
            {
                if(node.children.length == 0)
                {
                    this._add_child_to(node.id, this.c.type.NONE);
                }
            }break;
        }
        this._update_struct();
    }
    add_child()
    {
        let new_id = this._add_child_to(this.selected_node_id_1, this.c.type.NONE);
        this._select_node(new_id);
        this._define_visual_struct();
    }
    _add_child_to(parent_id, type)
    {
        let id = uuid.v1();
        let sel_node = this.get_node_by_id(parent_id);

        if(    sel_node.type === this.c.type.AND
            || sel_node.type === this.c.type.OR
            || sel_node.type === this.c.type.IFELSE
            || sel_node.type === this.c.type.SELECTOR)
        {
            sel_node.children.push(id);
        }
        else
        {
            if(sel_node.children.length == 0)
            {
                sel_node.children.push(id);
            }
            else
            {
                let prev = this.get_node_by_id(sel_node.children[0]);
                while(prev.next !== "")
                {
                    prev = this.get_node_by_id(prev.next);
                }
                prev.next = id;
            }
        }
        this.nodes.set(id, {id: id, type: type, next: "", children: [], name:"" });

        switch (type)
        {
            case this.c.type.IF:
            {
                this._add_child_to(id, this.c.type.NONE);
            }break;
            case this.c.type.IFELSE:
            {
                this._add_child_to(id, this.c.type.NONE);
                this._add_child_to(id, this.c.type.NONE);
            }break;
            case this.c.type.SELECTOR:
            {
                this._add_child_to(id, this.c.type.IF);
                this._add_child_to(id, this.c.type.IF);
            }break;
            case this.c.type.WHILE:
            {
                this._add_child_to(id, this.c.type.NONE);
            }break;
            case this.c.type.AND:
            {
                this._add_child_to(id, this.c.type.NONE);
                this._add_child_to(id, this.c.type.NONE);
            }break;
            case this.c.type.OR:
            {
                this._add_child_to(id, this.c.type.NONE);
                this._add_child_to(id, this.c.type.NONE);
            }break;
            case this.c.type.PROCESS:
            {
                this._add_child_to(id, this.c.type.NONE);
            }break;
        }
        this._update_struct();

        return id;
    }
    add_next()
    {
        let new_id = this._add_next_to(this.selected_node_id_1, this.c.type.NONE);
        this._select_node(new_id);
        this._define_visual_struct();
    }
    _add_next_to(node_id, type)
    {
        let id = uuid.v1();
        let sel_node = this.get_node_by_id(node_id);
        this.nodes.set(id, {id:id, type: type, next: sel_node.next, children: [], name:"" });
        sel_node.next = id;
        this._update_struct();
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
    scale_to_node(node_id)
    {
        this.root = node_id;
        this._define_visual_struct();
    }
    expand_node(node_id)
    {
        this._expanded.add(node_id);
        this._define_visual_struct();
    }
    collapse_node(node_id)
    {
        this._expanded.delete(node_id);
        this._define_visual_struct();
    }
}
export default new view_store();