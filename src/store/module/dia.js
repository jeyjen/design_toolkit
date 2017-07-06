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
    root_character: "",
    root_node: "",
    nodes: {},
    characters: {},
    expanded: expanded,
};

// отношение node->role
let node_role = null;

let define_rel_node_role = (state)=>{
    node_role = {};
    for(let key in state.characters){
        let character = state.characters[key];
        node_role[character.root_node_id] = character.id;
    }
}

const mutations = {
    [m.project.put] (state, prj) {
        prj.characters.forEach((i)=>{
            state.characters[i.id] = i;
        });
        prj.nodes.forEach((i)=>{
            state.nodes[i.id] = i;
        });
        if(! prj.root_character_id in state.characters ){
            throw 'не существует роли с id ' + prj.root_character_id;
        }
        state.root_character = prj.root_character_id;
        let r = state.characters[prj.root_character_id];

        if(! r.root_node_id in state.nodes){
            throw 'не существует узла с id ' + prj.root_node_id;
        }
        state.root_node = r.root_node_id;

        // определить отношение между узлом и ролью
        define_rel_node_role(state);
    }
}

let prepare_result = (nodes, characters, links)=>{
   return {
       nodes,
       characters,
       links
   }
}

// getters
const getters = {
    graph(state){

        let links = [];

        let v_character_x = {};
        let v_character_order = [state.root_character];
        let v_character_y = {};
        let max_y = 0;

        let v_nodes = [];
        let v_nodes_map = {};
        if(state.root_node === "")
            return prepare_result([], []);

        let stack = [];
        let level_stack = [];

        let x = 0;
        let y = 1;
        stack.push(state.root_node);
        level_stack.push(y);

        while (stack.length > 0){
            let v_node = {};
            let n = state.nodes[stack.pop()];
            let y = level_stack.pop();
            x += 1;
            v_node.id = n.id;
            v_node.type = type[n.type];
            v_node.code = n.code;
            v_node.x = x;
            v_node.y = y;

            if (n.id !== state.root_node && n.next !== ""){
                stack.push(n.next);
                level_stack.push(y);
            }

            // LINK
            if(n.contains.length > 0 && n.id in state.expanded){
              for(let i = n.contains.length - 1; i >= 0; i--){ // LINK
                links.push({from:n.id, to: n.contains[i]});
              }
            }
            else if(n.next !== ""){
              links.push({from:n.id, to: n.next});
            }
            else if(stack.length > 0){
              links.push({from:n.id, to: stack[stack.length - 1]});
            }

            if(n.next !== "" && (n.type === 6 || n.type === 7)){
              links.push({from:n.id, to: n.next});
            }

            let expand_state = expand.none;// none, open, close
            if(n.contains.length > 0){
                if(n['id'] in state.expanded){
                    // отображается открытым со значком -
                    if(n.type === 6 || n.type === 7 ){
                        let character_id = node_role[n.contains[0]];
                        if(character_id in v_character_x){
                            v_character_x[character_id].push(x);
                        }
                        else{
                            v_character_x[character_id] = [x];
                            v_character_order.push(character_id);
                        }
                    }
                    else{
                        if(max_y < y){
                          max_y = y;
                        }
                        for(let i = n.contains.length - 1; i >= 0; i--){
                            stack.push(n.contains[i]);
                            level_stack.push(y + 1);
                        }
                    }
                }
                expand_state = expand.open;
            }
            else{
                // отображать закрытой со значком +
                expand_state = expand.closed;
            }
            v_node.expand_state = expand_state;
            v_nodes.push(v_node);
            v_nodes_map[v_node.id] = v_node;
        }
        let character_y = max_y + 3;
        for(let i = 1; i < v_character_order.length; i++){
            let character_id = v_character_order[i];
            let node_id = state.characters[character_id].root_node_id;
            let n = state.nodes[node_id];

            v_character_y[character_id] = character_y;

            let x_coor = v_character_x[character_id];
            for(let j = 0; j < x_coor.length; j++){
                x = x_coor[j];
                let v_node = {};
                v_node.id = n.id;
                v_node.type = type[n.type];
                v_node.code = n.code;
                v_node.x = x;
                v_node.y = character_y;
                v_nodes.push(v_node);
                v_nodes_map[v_node.id] = v_node;
            }
            character_y += 1;
        }

        // отобразить названия персонажей
        v_character_y[state.root_character] = 1;

        let characters = [];
        for(let i = 0; i < v_character_order.length; i++){
            let character_id = v_character_order[i];
            let character = state.characters[character_id];
            let v_character = {};
            v_character.id = character.id;
            v_character.name = character.name;
            v_character.x = 0;
            v_character.y = v_character_y[character_id];
            characters.push(v_character);
        }

        // вычислить пути для стрелок

      //let path = 'Mx y Lx y'; // для потомков
      /*
      * d += "M" + (this.x(i.x1) + 8) + " " + (this.y(i.y1) + 8);
       d += " L " + (this.x(i.x2) - 9) + " " + (this.y(i.y2) - 9);
      * */
      let ls = [];
      for (let i = 0; i < links.length; i++){
        let num = i;
        let from = v_nodes_map[links[i].from];
        let to = v_nodes_map[links[i].to];
        if(from.y < to.y){
          let path = `M ${from.x * 40} ${from.y * 40} L${to.x * 40} ${to.y * 40}`;
          ls.push(path);
        }
        else if(to.y < from.y){
          let path = `M ${from.x * 40} ${from.y * 40} L${to.x * 40} ${to.y * 40}`;
          ls.push(path);
        }
        else{
          let path = `M ${from.x * 40} ${from.y * 40} L${to.x * 40} ${to.y * 40}`;
          ls.push(path);
        }
      }
      return prepare_result(v_nodes, characters, ls);
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
