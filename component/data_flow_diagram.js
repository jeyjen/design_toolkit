import React from'react';
import d3 from 'd3';

//http://bl.ocks.org/mbostock/4557698

export default class Dia extends React.Component {
    //static propTypes = {
    //    children: React.PropTypes.element.isRequired
    //}
    constructor(props) {
        super(props);

        this._element = undefined;
    }

    render(){
        console.log('render');
        return(
            <svg className="dia_field" ref={(ref) => this._element = ref}></svg>
        );
    }

    componentDidMount(){

        let circleRadius = 10;
        let squareSize = 20;

        // Первоначальная отрисовка элементов

        let svg = d3.select(this._element);

        // Подготовка данных
        let data = this.props.data;

        // Установка ссылок
        //data.links.forEach(function(d) {
        //    d.s = data.nodes[d.s];
        //    d.t = data.nodes[d.t];
        //});
        /*
         // Разбиение на пачки
         let bundles = {};
         bundles.reps = [];
         bundles.ops = [];
         data.nodes.forEach(function(d){
         if(d.type == 1){

         }
         switch (d.type){
         case 1:{
         bundles.ops.push(d);
         }break;
         case 2:{
         bundles.reps.push(d);
         }break;
         }
         });


         */
        /*
         let links = svg.selectAll(".link")
         .data(data.links)
         .enter()
         .append((d)=>{
         if(d.t.x < d.s.x ){
         return document.createElementNS('http://www.w3.org/2000/svg', "path");
         }
         else {
         return return document.createElementNS('http://www.w3.org/2000/svg', "line");
         }
         });*/

        // Нормальные стрелки
        /*






         svg.selectAll(".rep")
         .data(bundles.reps)
         .enter()
         .append("rect")
         .attr("class", "rep")
         .attr("width", squareSize)
         .attr("height", squareSize)
         .attr("x", function(d) { return d.x - squareSize/2; })
         .attr("y", function(d) { return d.y - squareSize/2; });
         */


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

        let norm_links = data.links.map((i)=>{
            return {x1: i.x1 * 30 + 50, y1: i.y1 * 20 + 50, x2: i.x2 * 30 + 50, y2: i.y2 * 20 + 50};
        });


        svg.selectAll(".link")
            .data(norm_links.filter((d)=>{return d.x2 < d.x1}))
            .enter()
            .append("path")
            .attr("d", (d)=>{
                let result = "M " + d.x1 + " " + d.y1;
                result += " L " + (d.x1 - 10) + " " + (d.y1 + 10);
                result += " L " + (d.x2 - 12) + " " + (d.y1 + 10);
                result += " L " + (d.x2 - 14) + " " + (d.y1 + 8);
                result += " L " + (d.x2 - 14) + " " + (d.y2 + 5);
                result += " L " + (d.x2 - squareSize/2) + " " + (d.y2);
                return result;
            })
            .attr("stroke", "white")
            .attr("strike-width", "3")
            .attr("fill", "none")
            .attr("class", "link")
            .attr("marker-end", "url(#arrow)");

        svg.selectAll(".link")
            .data(norm_links.filter((d)=>{return d.x2 > d.x1}))
            .enter()
            .append("path")
            .attr("d", (d)=>{
                let result = "M " + d.x1 + " " + d.y1;
                result += " L " + (d.x1 + 10)  + " " + (d.y1 + 10);
                result += " L " + (d.x2 - 14) + " " + (d.y1 + 10);
                result += " L " + (d.x2 - 12) + " " + (d.y1 + 12);
                result += " L " + (d.x2 - 12) + " " + (d.y2 - 10);
                result += " L " + (d.x2 - 8) + " " + (d.y2 - 5);
                //result += " L " + (d.x2 - 20) + " " + (d.y2);
                //result += " L " + (d.x2 - squareSize/2) + " " + (d.y2);
                return result;
            })
            .attr("stroke", "white")
            .attr("strike-width", "3")
            .attr("fill", "none")
            .attr("class", "link")
            .attr("marker-end", "url(#arrow)");

        //svg.selectAll(".link")
        //    .data(norm_links.filter((d)=>{ return d.x2 > d.x1}))
        //    .enter()
        //    .append("line")
        //    .attr("x1", (d)=> { return d.x1; })
        //    .attr("y1", (d)=> { return d.y1; })
        //    .attr("x2", (d)=> {
        //        let r = Math.sqrt((d.x1 - d.x2)*(d.x1 - d.x2) + (d.y1 - d.y2)*(d.y1 - d.y2));
        //        console.log("r = " + r);
        //        let rel = circleRadius / r;
        //        console.log("rel = " + rel);
        //        let addX = (d.x1 - d.x2) * rel;
        //        console.log("add = " + addX);
        //        return d.x2 + addX;
        //    })
        //    .attr("y2", (d)=> {
        //
        //        let r = Math.sqrt((d.x1 - d.x2)*(d.x1 - d.x2) + (d.y1 - d.y2)*(d.y1 - d.y2));
        //        console.log("r = " + r);
        //        let rel = circleRadius / r;
        //        console.log("rel = " + rel);
        //        let addY = (d.y1 - d.y2) * rel;
        //        console.log("add = " + addY);
        //        return d.y2 + addY;
        //    })
        //    .attr("class", "link")
        //    .attr("marker-end", "url(#arrow)");



        svg.selectAll(".op")
            .data(data.nodes)
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
            .data(data.nodes)
            .enter()
            .append("text")
            .attr("x", (d)=>{return d.x * 30  + 50 + 12;})
            .attr("y", (d)=>{return d.y * 20  + 45;})
            .text((d)=>{return d.title;})
            .attr("font-size", "7px")
            .attr("font-family", "sans-serif")
            //.attr("text-anchor", "middle")
            .attr("fill", "white");



        this.componentDidUpdate();
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }
}
