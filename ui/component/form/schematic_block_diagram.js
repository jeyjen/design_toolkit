import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import {connect} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Flexbox from '../control/flexbox';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import * as a from '../reducer/action/schematic_block_diagram';


let define_visual_nodes = (root, data)=>
{
    let start_node = {id:"start", type:9, next: "", child: root, expanded: true, name:">>" };
    let end_node = {id:"end", type:10, next: "", child: "", name:"<<", expand_state: 0 };

    let stack = [];
    let level_stack = [];
    let level = 1;
    stack.push(start_node);
    level_stack.push(level);
    let x = 1;
    let y = 1;

    let v_nodes = new Map();

    while (stack.length > 0)
    {
        let v_node = {};

        let n = stack.pop();
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
            if(stack.length > 0)
            {
                v_node['next'] = stack[stack.length - 1]['id'];
            }
        }
        else
        {
            stack.push(data.get(n['next']));
            level_stack.push(l);
        }
        let expand_state = 0;// none, open, close
        if(n.hasOwnProperty("child") && n["child"] != null && n["child"] != "")
        {
            if(n['expanded'])
            {
                stack.push(data.get(n["child"]));
                level_stack.push(l + 1);
                expand_state = 1;
            }
            else
            {
                expand_state = 2;
            }
        }
        else
        {
            expand_state = 0;
        }
        v_node['expand_state'] = expand_state;

        if(stack.length == 0)
        {
            v_node["next"] = "end";
        }
        v_nodes.set(v_node['id'], v_node);
    }
    end_node["y"] = y + 1;
    end_node["x"] = 1;
    v_nodes.set(end_node['id'], end_node);
    return v_nodes;
}
let get_values = (map)=>
{
    let values = [];
    for (var value of map.values()) {
        values.push(value);
    }
    return values;
}


class generator extends React.Component {

    constructor(props) {
        super(props);
    }

    render()
    {
        let nodes = define_visual_nodes("1", this.props.schematic_block_diagram.nodes);
        let data = get_values(nodes);


        return(
            <Flexbox
                flexDirection="column"
                justifyContent="center"
                alignItems="stretch"
                margin="7px"
            >
                <svg className="dia_field">
                    <defs>
                        <marker id="arrow" viewBox="0 -15 30 30" refX="10" refY="0" markerWidth="20" markerHeight="20" orient="auto"><path d="M0,-3 L10,0 L10,0 L0,3" class="arrowHead"></path></marker>
                    </defs>
                    <circle id="asd" cx="60" cy="60" r="20" onClick={this.increase({hello: "hello world"})} />
                </svg>
            </Flexbox>
        );
    }




    increase(p)
    {
        return function (e, p2) {
            e.persist();
            console.log('--------------');
            console.log(p);
            console.log(p2);
            console.log(e);
            console.log(this);
        }.bind(this) //important to bind function
    }

    componentDidMount(){
/*
        debugger;

        ///let ddd = this.props.schematic_block_diagram;

        //

        //<path d="M 65 101 L 80 113" stroke="white" strike-width="3" fill="none" class="link" marker-end="url(#arrow)"></path>

        // <text class="node op" x="110" y="186" font-size="9px" font-family="sans-serif" fill="white">op</text>

        const x_offset = 50;
        const y_offset = 50;
        const x_step_size = 15;
        const y_step_size = 17;

        console.log(this.props);



        let svg = d3.select(this._element);

        let defs = svg.append("defs")

        defs.append("marker")
            .attr({
                "id":"arrow",
                "viewBox":"0 -15 30 30",
                "refX":10,
                "refY":0,
                "markerWidth":20,
                "markerHeight":20,
                "orient":"auto"
            })
            .append("path")
            .attr("d", "M0,-3 L10,0 L10,0 L0,3")
            .attr("class","arrowHead");

        svg.selectAll(".child_link")
            .data(data.filter((d)=>{return d["child"] != "" && nodes.has(d["child"])} ))
            .enter()
            .append("path")
            .attr("d", (d)=>{
                let to = nodes.get(d["child"]);
                let result = "M " + (d.x  * x_step_size + x_offset) + " " + (d.y * y_step_size + y_offset);
                result += " L " + (to.x * x_step_size + x_offset)  + " " + (to.y  * y_step_size + y_offset - 5);
                return result;
            })
            .attr("stroke", "white")
            .attr("strike-width", "3")
            .attr("fill", "none")
            .attr("class", "link")
            .attr("marker-end", "url(#arrow)");


        svg.selectAll(".next_link")
            .data(data.filter((d)=>{return d["next"] != "" && nodes.has(d["next"])}))
            .enter()
            .append("path")
            .attr("d", (d)=>{
                let to = nodes.get(d["next"]);

                let result = "M " + (d.x  * x_step_size + x_offset) + " " + (d.y * y_step_size + y_offset);
                result += " L " + (to.x * x_step_size + x_offset)  + " " + (to.y  * y_step_size + y_offset  - 5);
                return result;
            })
            .attr("stroke", "white")
            .attr("strike-width", "3")
            .attr("fill", "none")
            .attr("class", "link")
            .attr("marker-end", "url(#arrow)");

        //svg.selectAll(".op")
        //    .data(data)
        //    .enter()
        //    .append("circle")
        //    .attr("class", "op")
        //    .attr("r", circleRadius)
        //    .attr("cx", function(d) { return d.x * 30 + 50; })
        //    .attr("cy", function(d) { return d.y * 20 + 50; })
        //    .on("click", function(d){
        //        let el = d3.select(this);
        //        if(el.attr("class") == "op"){
        //            el.attr("class", "op_clicked");
        //        }
        //        else {
        //            el.attr("class", "op");
        //        }
        //    })
        //    .on("dblclick", function(){alert("ok")})
        //    .on("contextmenu", function (d, i) {
        //        alert("menu");
        //        d3.event.preventDefault();
        //
        //        // react on right-clicking
        //    });

        svg.selectAll(".node")
            .data(data)
            .enter()
            .append("text")
            .classed('node', true)
            .classed('op', function(d) { return true; })
            .attr("x", (d)=>{return d.x * x_step_size  + x_offset;})
            .attr("y", (d)=>{return d.y * y_step_size  + y_offset;})
            .text((d)=>
            {
                switch(d['type'])
                {
                    case 1:
                    {
                        return 'if';
                    }break;
                    case 2:
                    {
                        return 'el';
                    }
                    case 3:
                    {
                        return 'sw';
                    }
                    case 4:
                    {
                        return 'op';
                    }
                    case 5:
                    {
                        return 'del';
                    }
                    case 6:
                    {
                        return 'p';
                    }
                    default:
                    {
                        return '';
                    }
                }
            })
            .attr("font-size", "9px")
            .attr("font-family", "sans-serif")
            //.attr("text-anchor", "middle")
            .attr("fill", "white")
            .on("click", function(d){
                // вызвать action

                //let el = d3.select(this);
                //if(el.attr("class") == "op"){
                //    el.attr("class", "op_clicked");
                //}
                //else {
                //    el.attr("class", "op");
                //}
            })

        svg.selectAll(".title")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "title")
            .attr("x", (d)=>{return d.x * x_step_size  + x_offset + 15;})
            .attr("y", (d)=>{return d.y * y_step_size  + y_offset;})
            .text((d)=>{return d['name'];})
            .attr("font-size", "7px")
            .attr("font-family", "sans-serif")
            //.attr("text-anchor", "middle")
            .attr("fill", "white");


*/
        //this.componentDidUpdate();
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }
}


function map_state_to_props (state, own_pros) {

    return state;
}

function map_dispatch_to_props(dispatch, own_props){
    let s =
    {

        on_product_type_changed(event, index, value)
        {
            //dispatch(a.change_product_type(value));
        }
    }
    return s;
}

export default connect(map_state_to_props, map_dispatch_to_props)(generator);