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


let define_visual_nodes= (root, data)=>
{
    let stack = [];
    let level_stack = [];
    let level = 1;
    stack.push(data[root]);
    level_stack.push(level);
    let x = 1;
    let y = 1;

    let v_nodes = {};

    let end_node = {id:"0000", name:"end", type:10, expand_state: 0, next:"", child: ""};


    while (stack.length > 0)
    {
        let n = stack.pop();
        let l = level_stack.pop();
        x = l;
        if(l != level)
        {
            y += 1
        }
        else
        {
            y += 2;
        }
        level = l;
        if (n["next"] == "")
        {
            if(stack.length > 0)
            {
                n["next"] = stack[stack.length - 1]["id"];
            }
        }
        else
        {
            stack.push(data["n_" + n["next"]]);
            level_stack.push(l);
        }
        let expand_state = 0;// none, open, close
        if(n.hasOwnProperty("child") && n["child"] != null && n["child"] != "")
        {
            if(n["expanded"])
            {
                stack.push(data["n_" + n["child"]]);
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
        if(stack.length == 0)
        {
            n["next"] = "0000";
        }



        v_nodes["n_" + n["id"]] = {id: n["id"], name: n["name"], type: n["type"], x: x, y: y, expand_state: expand_state, next:n["next"], child: n["child"]};
    }
    end_node["y"] = y + 1;
    end_node["x"] = 1;
    v_nodes["n_" + end_node["id"]] = end_node;
    return v_nodes;
}
let get_all_values = (obj)=>
{
    let values = [];
    for(let k in obj)
    {
        values.push(obj[k]);
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

        console.log(this.props);


        let nodes = define_visual_nodes("n_1", this.props["nodes"]);
        let data = get_all_values(nodes);

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
            .data(data.filter((d)=>{return d["child"] != "" && nodes.hasOwnProperty("n_" + d["child"])} ))
            .enter()
            .append("path")
            .attr("d", (d)=>{
                let to = nodes["n_" + d["child"]];

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
            .data(data.filter((d)=>{return d["next"] != "" && nodes.hasOwnProperty("n_" + d["next"])}))
            .enter()
            .append("path")
            .attr("d", (d)=>{
                let to = nodes["n_" + d["next"]];

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
            .text((d)=>{return d.name;})
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
    let prop = Object.assign({common:state.common}, state.schematic_block_diagram);
    return prop;
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