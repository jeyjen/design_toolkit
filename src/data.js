export default {
    id: 'proj_01',
    title: 'проект 1',
    root_character_id : 'r_01',
    characters: [
        { id: 'r_01', name: 'n_r_01', title: 'role 01', root_node_id: 'n_00'},
        { id: 'r_02', name: 'n_r_02', title: 'role 02', root_node_id: 'n_23'}
    ],
    nodes: [
        // root operation
        { id:'n_00', code:'p_00', type: 0, next: '', contains: ['n_01'], title: 'op 0', description: '' },
        // switch 1
        { id:'n_01', code:'s_01', type: 4, next: 'n_03', contains: ['n_02'], title: 'sel 1', description: '' },
        { id:'n_02', code:'o_02', type: 1, next: '', contains: ['n_05'], title: 'op 3', description: '' },
        // switch 2
        { id:'n_03', code:'s_03', type: 4, next: '', contains: ['n_04'], title: 'sel 2', description: '' },
        { id:'n_04', code:'o_04', type: 1, next: '', contains: [], title: 'op 4', description: '' },
        // if
        { id:'n_05', code:'if_05', type: 2, next: 'n_07', contains: ['n_06'], title: 'if 5', description: '' },
        { id:'n_06', code:'op_06', type: 1, next: '', contains: [], title: 'op 6', description: '' },
        // if else
        { id:'n_07', code:'ie_07', type: 3, next: 'n_10', contains: ['n_08', 'n_09'], title: 'if else 7', description: '' },
        { id:'n_08', code:'op_08', type: 1, next: '', contains: [], title: 'op 8', description: '' },
        { id:'n_09', code:'op_09', type: 1, next: '', contains: [], title: 'op 9', description: '' },
        // while
        { id:'n_10', code:'w_10', type: 5, next: 'n_13', contains: ['n_11'], title: 'while 10', description: '' },
        { id:'n_11', code:'op_11', type: 1, next: 'n_12', contains: [], title: 'op 11', description: '' },
        { id:'n_12', code:'op_12', type: 1, next: '', contains: [], title: 'op 12', description: '' },
        // cmd
        { id:'n_13', code:'cmd_13', type: 6, next: 'n_14', contains: ['n_23'], title: 'cmd 13', description: '' }, // сделать ссылки на ноды других ролей
        // request
        { id:'n_14', code:'req_14', type: 7, next: '', contains: [], title: 'request 14', description: '' }, // сделать ссылки на ноды других ролей
        // and
        { id:'n_15', code:'and_15', type: 8, next: 'n_19', contains: ['n_16', 'n_17', 'n_18'], title: 'and 15', description: '' },
        { id:'n_16', code:'op_16', type: 1, next: '', contains: [], title: 'op 16', description: '' },
        { id:'n_17', code:'op_17', type: 1, next: '', contains: [], title: 'op 17', description: '' },
        { id:'n_17', code:'op_18', type: 1, next: '', contains: [], title: 'op 18', description: '' },
        // or
        { id:'n_19', code:'or_19', type: 9, next: '', contains: ['n_20', 'n_21', 'n_22'], title: '', description: '' },
        { id:'n_20', code:'op_20', type: 1, next: '', contains: [], title: '', description: '' },
        { id:'n_21', code:'op_21', type: 1, next: '', contains: [], title: '', description: '' },
        { id:'n_22', code:'op_22', type: 1, next: '', contains: [], title: '', description: '' },
        //{ id:'n_', code:'c_', type: 1, next: '', contained_in: '', title: '', description: '' },
        // ROLE 2
        { id:'n_23', code:'op_23', type: 0, next: '', contains: [], title: '', description: '' }
    ]
}

/*
 ! {id:"0", type:0, next: "", children: ["1"], name:"process", description:"описание 0" },
 ! {id:"1", type:4, next: "2", children: ["3"], name:"selector 1", description:"описание 1" },
 ! {id:"2", type:4, next: "", children: ["4"], name:"selector 2", description:"описание 2" },
 ! {id:"3", type:1, next: "5", children: [], name:"operation 3", description:"описание 3" },
 ! {id:"4", type:1, next: "", children: [], name:"operation 4", description:"описание 4" },

 // if
 ! {id:"5", type:2, next: "7", children: ["6"], name:"if 5", description:"описание 5" },
 ! {id:"6", type:1, next: "", children: [], name:"operation 6", description:"описание 6" },

 // if else
 ! {id:"7", type:3, next: "10", children: ["8", "9"], name:"ifelse 7", description:"описание 7" },
 ! {id:"8", type:1, next: "", children: [], name:"operation 8", description:"описание 8" },
 ! {id:"9", type:1, next: "", children: [], name:"operation 9", description:"описание 9" },

 // while
 ! {id:"10", type:5, next: "13", children: ["11"], name:"while 10", description:"описание 10" },
 ! {id:"11", type:1, next: "12", children: [], name:"operation 11", description:"описание 11" },
 ! {id:"12", type:1, next: "", children: [], name:"operation 12", description:"описание 12" },

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
 */

/*
 PROCESS: 0,
 OPERATION: 1, может быть вложенной при выполнении операции детализации. по отсутствию дочерних узлов в проекте можно определить мельчайшие операции
 IF: 2,
 IFELSE: 3,
 SWITCH: 4,
 WHILE: 5,
 COMMAND: 6,
 REQUEST: 7,
 AND: 8,
 OR: 9
*/

