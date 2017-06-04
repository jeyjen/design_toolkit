/**
 * Created by eugene on 09.05.2017.
 */
import {m, a} from '../../name'

let type = {};
type[0] = "_process";
type[1] = "_operation";
type[2] = "_if";
type[3] = "_ifelse";
type[4] = "_switch";
type[5] = "_while";
type[6] = "_command";
type[7] = "_request";
type[8] = "_and";
type[9] = "_or";

let expand = {
    none: 'none',
    open: 'opened',
    closed: 'closed',
};

let expanded = {};
expanded['n_00'] = true;
expanded['n_01'] = true;
expanded['n_02'] = true;
expanded['n_03'] = true;
expanded['n_04'] = true;
expanded['n_05'] = true;
expanded['n_06'] = true;
expanded['n_07'] = true;
expanded['n_08'] = true;
expanded['n_09'] = true;
expanded['n_10'] = true;
expanded['n_11'] = true;
expanded['n_12'] = true;
expanded['n_13'] = true;
expanded['n_14'] = true;
expanded['n_15'] = true;
expanded['n_16'] = true;
expanded['n_17'] = true;
expanded['n_18'] = true;
expanded['n_19'] = true;
expanded['n_20'] = true;
expanded['n_21'] = true;
expanded['n_22'] = true;


// initial state
const state = {
    root_role: "",
    root_node: "",
    nodes: {},
    roles: {},
    expanded: expanded,
};

// отношение node->role
let node_role = null;

let define_rel_node_role = (state)=>{
    node_role = {};
    for(let key in state.roles){
        let role = state.roles[key];
        node_role[role.root_node_id] = role.id;
    }
}

const mutations = {
    [m.project.put] (state, prj) {
        prj.roles.forEach((i)=>{
            state.roles[i.id] = i;
        });
        prj.nodes.forEach((i)=>{
            state.nodes[i.id] = i;
        });
        if(! prj.root_role_id in state.roles ){
            throw 'не существует роли с id ' + prj.root_role_id;
        }
        state.root_role = prj.root_role_id;
        let r = state.roles[prj.root_role_id];

        if(! r.root_node_id in state.nodes){
            throw 'не существует узла с id ' + prj.root_node_id;
        }
        state.root_node = r.root_node_id;

        // определить отношение между узлом и ролью
        define_rel_node_role(state);


        // вычислить родителей
        // вычилить иерархию ролей
        // вычислить роль по id узла
    }
}

// getters
const getters = {
    graph(state){

        // для роли сохранить список y координат для отображения
        // по роли определить корневой узел
        // сохранить порядок появления ролей
        //

        let v_role_coors = {};
        let v_role_order = [];

        let v_nodes = [];
        if(state.root_node === "")
            return v_nodes;

        let stack = [];
        let level_stack = [];

        let x = 0;
        let y = 1;
        stack.push(state.root_node);
        level_stack.push(y);


        while (stack.length > 0)
        {
            let v_node = {};
            let n = state.nodes[stack.pop()];
            let y = level_stack.pop();
            x += 1;
            v_node.id = n.id;
            v_node.type = type[n.type];
            v_node.code = n.code;
            v_node.x = x;
            v_node.y = y;

            if (n.id !== state.root_node && n.next !== "")
            {
                stack.push(n.next);
                level_stack.push(y);
            }
            let expand_state = expand.none;// none, open, close
            if(n.contains.length > 0){
                if(n['id'] in state.expanded){
                    // отображается открытым со значком -
                    if(n.type === 6 || n.type === 7 ){
                        debugger;
                        let nnn = n.contains[0];
                        let role_id = node_role[nnn];
                        if(role_id in v_role_coors){
                            v_role_coors[role_id].push(x);
                        }
                        else{
                            v_role_coors[role_id] = [x];
                            v_role_order.push(role_id);
                        }
                    }
                    else{
                        for(let i = n.contains.length - 1; i >= 0; i--){
                            stack.push(n.contains[i]);
                            level_stack.push(y + 1);
                        }
                    }
                    expand_state = expand.open;
                }
                else
                {
                    // отображать закрытой со значком +
                    expand_state = expand.closed;
                }
            }
            v_node.expand_state = expand_state;
            v_nodes.push(v_node);
        }

        y = 10;
        debugger;
        for(let i = 0; i < v_role_order.length; i++){
            let role_id = v_role_order[i];
            let node_id = state.roles[role_id].root_node_id;
            let n = state.nodes[node_id];

            let x_coor = v_role_coors[role_id];
            for(let j = 0; j < x_coor.length; j++){
                x = x_coor[j];
                let v_node = {};
                v_node.id = n.id;
                v_node.type = type[n.type];
                v_node.code = n.code;
                v_node.x = x;
                v_node.y = y;
                v_nodes.push(v_node);
            }
        }

        return v_nodes;
    }
}
// actions
const actions = {
    [a.project.load]({commit, state}, arg1){
        // что то
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
