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
        this._element = undefined;
    }

    render()
    {
        return(
            <Flexbox
                flexDirection="column"
                justifyContent="center"
                alignItems="stretch"
                margin="7px"
            >
                <svg className="dia_field" ref={(ref) => this._element = ref}></svg>
            </Flexbox>

        );
    }

    componentDidMount(){

        debugger;

        ///let ddd = this.props.schematic_block_diagram;

        console.log(this.props);

        let nodes = define_visual_nodes("1", this.props.schematic_block_diagram.nodes);
        let data = get_values(nodes);

        let circleRadius = 10;
        let squareSize = 20;

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
            .attr("d", "M0,-5 L10,0 L10,0 L0,5")
            .attr("class","arrowHead");

        svg.selectAll(".child_link")
            .data(data.filter((d)=>{return d["child"] != "" && nodes.has(d["child"])} ))
            .enter()
            .append("path")
            .attr("d", (d)=>{
                let to = nodes.get(d["child"]);
                let result = "M " + (d.x  * 30 + 50) + " " + (d.y * 20 + 50);
                //result += " L " + (d.x1 - 10) + " " + (d.y1 + 10);
                //result += " L " + (d.x2 - 12) + " " + (d.y1 + 10);
                //result += " L " + (d.x2 - 14) + " " + (d.y1 + 8);
                //result += " L " + (d.x2 - 14) + " " + (d.y2 + 5);
                result += " L " + ((to.x * 30 + 50) - squareSize/2)  + " " + (to.y  * 20 + 50);
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

                let result = "M " + (d.x  * 30 + 50) + " " + (d.y * 20 + 50);
                //result += " L " + (d.x1 - 10) + " " + (d.y1 + 10);
                //result += " L " + (d.x2 - 12) + " " + (d.y1 + 10);
                //result += " L " + (d.x2 - 14) + " " + (d.y1 + 8);
                //result += " L " + (d.x2 - 14) + " " + (d.y2 + 5);
                result += " L " + ((to.x * 30 + 50) - squareSize/2)  + " " + (to.y  * 20 + 50);
                return result;
            })
            .attr("stroke", "white")
            .attr("strike-width", "3")
            .attr("fill", "none")
            .attr("class", "link")
            .attr("marker-end", "url(#arrow)");

        svg.selectAll(".op")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "op")
            .attr("r", circleRadius)
            .attr("cx", function(d) { return d.x * 30 + 50; })
            .attr("cy", function(d) { return d.y * 20 + 50; })
            .on("click", function(d){
                let el = d3.select(this);
                if(el.attr("class") == "op"){
                    el.attr("class", "op_clicked");
                }
                else {
                    el.attr("class", "op");
                }
            })
            .on("dblclick", function(){alert("ok")})
            .on("contextmenu", function (d, i) {
                alert("menu");
                d3.event.preventDefault();

                // react on right-clicking
            });

        svg.selectAll(".title")
            .data(data)
            .enter()
            .append("text")
            .attr("x", (d)=>{return d.x * 30  + 50 + 12;})
            .attr("y", (d)=>{return d.y * 20  + 50;})
            .text((d)=>{return d['name'];})
            .attr("font-size", "7px")
            .attr("font-family", "sans-serif")
            //.attr("text-anchor", "middle")
            .attr("fill", "white");



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