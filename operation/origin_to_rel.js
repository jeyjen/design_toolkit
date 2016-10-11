import origin from '../data/origin_data';


//Конвертировать коллекции операций и репозиториев в список объектов с ключами
// Список репозиторием с координатами
// Список отношений с ссылками на объекты с позициями

// Построить граф объектов
// у графа усуществлять поиск ноды по идентификактору объекта
// нода содержит список нод, на которые она ссылается и которые ссылаются на нее
//



let graph = {};

// запись в общий граф операций
origin.operations.forEach((item)=>{
    graph["o" + item.id] = {
        data: item,
        type: "op",
        from:[],
        to:[]
    }
});
// запись в общий граф репозиториев
origin.repositories.forEach((item)=>{
    graph["r" + item.id] = {
        data: item,
        type: "rep",
        from:[],
        to:[]
    }
});

origin.conditions.forEach((item)=>{
    graph["c" + item.id] = {
        data: item,
        type: "con",
        from:[],
        to:[]
    }
});

// устновка соотвествия между объектами
/*
 * 1 - rep -> op
 * 2 - op -> rep
 * 3 - rep -> des
 * 4 - des -> op
 * */
origin.rels.forEach((item)=>{

    switch (item.t){
        case 1:{
            graph["r" + item.p1].to.push("o" + item.p2);
            graph["o" + item.p2].from.push("r" + item.p1);
        }break;
        case 2:{
            graph["o" + item.p1].to.push("r" + item.p2);
            graph["r" + item.p2].from.push("o" + item.p1);
        }break;
    }

});


// найти конечные точки
// у которых нет ту
// от каждой ту построить граф обхода

/*
 * хранит все входные объекты
 * */
let out_map = {};
let out = origin.out.map((item)=>{
    let name = "r"+item;
    out_map[name] = "";
    return name;
});

let input_map = {};
let input = origin.input.map((item)=>{
    let name = "o"+item;
    input_map[name] = "";
    return name;
});


let x_cord = {};
let line = {};
let next_line = {};
let level = 0;
out.forEach((i)=>{
    next_line[i] = "";
});

// x coord
do {
    line = next_line;
    next_line = {};
    for(let node in line)
    {
        if(x_cord.hasOwnProperty(node)){
            if(x_cord[node] < level){

                let from = graph[node].from;
                let fs = from.filter((item)=>{
                    return x_cord.hasOwnProperty(item) && x_cord[node] > x_cord[item];

                });
                if(fs.length == 0){

                    x_cord[node] = level;
                }
            }
        }
        else{
            x_cord[node] = level;
        }

        // заполнить next_line
        graph[node].from.forEach((item)=> {

            let fr = graph[item].from.filter((i)=> {
                return ! x_cord.hasOwnProperty(i);
            });

            if (fr.length > 0 || graph[item].from.length == 0)
            {
                next_line[item] = "";
            }
            // не добавлять те которые уже добавлены
        });
    }
    level ++;

}while(Object.keys(next_line).length > 0);

let x_max = -1;
for (let key in x_cord){
    if(x_cord[key] > x_max){
        x_max = x_cord[key];
    }
}

// нормализовать координату x
for(let key in x_cord){

    if(input_map.hasOwnProperty(key)){
        x_cord[key] = 0;
    }else if(out_map.hasOwnProperty(key)){
        x_cord[key] = x_max;
    }
    else {
        x_cord[key] = x_max - x_cord[key];
    }
}
debugger;



let y_cord = {};

let set_y = (n, y) =>{
    y_cord[n] = y;
};

let is_input = (n) => {
    let result = false;
    for(let i = 0; i < input.length; i++){
        if(n == input[i]){
            result = true;
            break;
        }
    }
    return result;
};

let y_max_by_x = (n) => {
    let x = x_cord[n];
    let max = 0;
    for (let key in y_cord){
        if(x_cord[key] == x && y_cord[key] > max ){
            max = y_cord[key];
        }
    }
    return max;
};

let round_stack = [];
let level_stack = [];
let idx = 0;
input.forEach((n)=>{
    round_stack.unshift(n);
    level_stack.unshift(idx);
    idx+=2;
});

for(let n in x_cord){
    y_cord[n] = 0;
}

while(round_stack.length) {
    let c = round_stack.pop();
    let l = level_stack.pop();

    set_y(c, l);

    let x_c = x_cord[c];
    let off = [];
    for(let i = 0; i <= x_max; i++){
        off.push(1);
    }

    for(let i = 0; i < graph[c].to.length; i++){
        let n = graph[c].to[i];
        let x_i = x_cord[n];
        let y_i = y_cord[n];
        if(x_i > x_c){

            if(n == "r10" || n == "r11" ||n == "r12" ||n == "r13"){
                n = n;
            }

            if(y_i == 0){
                let y_max = y_max_by_x(n);
                y_i = y_max + off[x_i] + 2;
            }
            else{
                if(y_i <= l + off[x_i]){
                    y_i = l + off[x_i];
                }
                let y_t = y_i;
                for(let key in y_cord){
                    if(key != n && x_cord[key] == x_i && y_cord[key] == y_t){
                        y_t += 2;
                        round_stack.push(key);
                        level_stack.push(y_t);
                    }
                }
            }

            round_stack.push(n);
            level_stack.push(y_i);

            off[x_i] += 2;
        }
    };
}


let result = {};
let nodes = [];
let links = [];
for(let key in graph){
    if(x_cord.hasOwnProperty(key) && y_cord.hasOwnProperty(key)){
        let node = {title: key, x: x_cord[key], y: y_cord[key]};
        nodes.push(node);

        graph[key].to.forEach((i)=>{
            if(x_cord.hasOwnProperty(i) && y_cord.hasOwnProperty(i)){
                links.push({x1:node.x, y1:node.y, x2:x_cord[i], y2:y_cord[i]});
            }
        });
    }
}

result["nodes"] = nodes;
result["links"] = links;
export default result;

