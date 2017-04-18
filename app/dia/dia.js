import React from 'react';
import component from '../../engine/component';
import vs from './state_visual';

class dia extends component {
    constructor(props) {
        super(props);
        this.state =
            {
                x_offset: this.props.x_offset === undefined? 30: this.props.x_offset,
                y_offset: this.props.y_offset === undefined? 30: this.props.y_offset
            };

    }
    componentDidMount()
    {
        this.on(vs, vs.e.on_selected_node_changed);
        this.on(vs, vs.e.on_visual_struct_changed);
    }
    componentWillUnmount()
    {
        this.off(vs, vs.e.on_selected_node_changed);
        this.off(vs, vs.e.on_visual_struct_changed);
    }
    render()
    {
        let color = this.props.node_color === undefined? '#546E7A': this.props.node_color;
        let els = [];
        let lbls = [];
        let expands = [];
        let key = 1;
        vs.v_nodes.forEach((v, k, m)=>
        {

            let c = color;
            if(vs.errors.has(v.id))
            {
                c = '#FF6E40';
            }
            if(vs.selected_node_id_1 == v.id)
            {
                c = '#FB8C00';
            }


            els.push(<use key={key++} xlinkHref={'#' + v.type} transform="scale(1)" x={this.x(v.x)} y={this.y(v.y)} style={{stroke:c, fill:c}} onDoubleClick={this.node_double_click(v.id)} onClick={this.node_click(v.id)} />);

            //<div
            //contentEditable={true}
            //style={{position:'relative', display:'block', marginLeft:5, outline: 'none', wordWrap: 'break-word'}}>
            //{v.name}
            //</div>
            lbls.push(<foreignObject x={this.x(v.x) + 25} y={this.y(v.y)} width={100}><div>{v.name}</div></foreignObject>);//<div >hello</div>
            //lbls.push(<text key={key++} x={this.x(v.x) + 25} y={this.y(v.y) + 12} dy="5" style={{fill:c}} onClick={this.node_click(v.id)}>{v.name}</text>);

            if(v.expand_state == vs.c.expand_state.EXPANDED)
            {
                expands.push(<use key={key++} xlinkHref={'#_expanded'} transform="scale(1)" x={this.x(v.x)-20} y={this.y(v.y)} style={{stroke:color, fill:color}} onClick={this.node_collapse.bind(v.id)} />);
            }
            else if(v.expand_state == vs.c.expand_state.COLLAPSED)
            {
                expands.push(<use key={key++} xlinkHref={'#_collapsed'} transform="scale(1)" x={this.x(v.x)-20} y={this.y(v.y)} style={{stroke:color, fill:color}} onClick={this.node_expand.bind(v.id)}/>);
            }
        });

        let links = vs.refs.map((i)=>
        {
            let d = "";

            if(i.x2 > i.x1)// для потомков
            {
                d += "M" + (this.x(i.x1) + 8) + " " + (this.y(i.y1) + 8);
                d += " L " + (this.x(i.x2) - 9) + " " + (this.y(i.y2) - 9);
            }
            else if(i.x2 == i.x1) // для узлов на одном уровне
            {
                d += "M" + this.x(i.x1) + " " + (this.y(i.y1) + 11);
                d += " L " + this.x(i.x2) + " " + (this.y(i.y2) - 12);
            }
            else if(i.x2 < i.x1 && i.y2 > i.y1 )// для следующих на уровень выше
            {
                d += "M" + (this.x(i.x1) - 8) + " " + (this.y(i.y1) + 8);
                d += " L " + (this.x(i.x2) + 9) + " " + (this.y(i.y2) - 9);
            }
            else if(i.x2 < i.x1 && i.y2 < i.y1) // для циклов (возврат к предыдущим на уровень выше)
            {

            }
            return <path key={key++} d={d} stroke={'#CFD8DC'} strokeWidth={1} fill="none" markerEnd="url(#arrow)"></path>
        })

        return (
            <svg className={this.props.className} style={{width:'100%', height:600}} onClick={()=>{ vs.select_node(null);}}>
                <defs>
                    <marker id="arrow" viewBox=" 0 0 10 10" markerWidth="5" markerHeight="5" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L6,3 z" fill={color} />
                    </marker>
                </defs>
                {links}
                {els}
                {lbls}
                {expands}
            </svg>
        );
    }

    x(x)
    {
        return this.state.x_offset * x;
    }
    y(y)
    {
        return this.state.y_offset * y;
    }

    node_double_click(node_id)
    {
        return function (e, id) {
            e.persist();
            e.stopPropagation();
            //console.log(node);
            //console.log(id);
            //console.log(e);
            //console.log(this);
            //vs.select_node(node_id);
            vs.scale_to_node(node_id);
        }.bind(this)
    }

    node_click(node_id)
    {
        return function (e, id) {
            e.persist();
            e.stopPropagation();
            //console.log(node);
            //console.log(id);
            //console.log(e);
            //console.log(this);
            vs.select_node(node_id);
        }.bind(this)
    }

    node_expand()
    {
        vs.expand_node(this);
    }

    node_collapse()
    {
        vs.collapse_node(this);
    }
}
export default dia;