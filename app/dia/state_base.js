import EventEmitter from 'event-emitter-es6';
import Col from 'es6-collections';

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

class base_state extends EventEmitter
{
    constructor()
    {
        super();

        this.e =
            {
                on_visual_struct_changed: 'on_visual_struct_changed',
                on_selected_node_changed: 'on_selected_node_changed'
            }

        this._prjs = new Map();
        this._roles = new Map();
        this._nodes = new Map();
        this._parent_node = new Map();
        this._prevois_node = new Map();

        // initialization


        fake_data.forEach((i)=>
        {
            this.nodes.set(i.id, i);
        });
    }

    init()
    {
        this._prjs.clear();
        this._prjs.clear();
    }
}
export default new base_state();