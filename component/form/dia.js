import React from 'react';
import component from '../../engine/component';
import vs from '../../store/view_store';

class dia extends component {
    constructor(props) {
        super(props);
        this.state =
        {
            x_offset: this.props.x_offset === undefined? 25: this.props.x_offset,
            y_offset: this.props.y_offset === undefined? 0: this.props.y_offset
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


            let exp = <svg width={24} height={24}
                           style={{display:'inline-block', verticalAlign: 'middle'}}>
                <use
                    key={key++}
                    xlinkHref={'#_empty'}
                    transform="scale(1)"
                    style={{display:'inline-block'}}
                     />
            </svg>;
            if(v.expand_state == vs.c.expand_state.EXPANDED)
            {
                exp =
                    <svg width={24} height={24}
                         style={{display:'inline-block', verticalAlign: 'middle'}}
                    >
                        <use
                            key={key++}
                            xlinkHref={'#_expanded'}
                            transform="scale(1)"
                            style={{stroke:color, fill:color, display:'inline-block'}}
                            onClick={this.node_collapse.bind(v.id)} />
                    </svg>;
            }
            else if(v.expand_state == vs.c.expand_state.COLLAPSED)
            {
                exp =
                    <svg width={24} height={24}
                         style={{display:'inline-block', verticalAlign: 'middle'}}
                    >
                        <use
                            key={key++}
                            xlinkHref={'#_collapsed'}
                            transform="scale(1)"
                            style={{ stroke:color, fill:color, display:'inline-block'}}
                            onClick={this.node_expand.bind(v.id)}/>
                    </svg>;
            }

            els.push(
                <div style={{paddingLeft:this.x(v.x) + 50, paddingTop:3, paddingBottom:3, position:'relative'}}>
                    <a style={{display:'inline-block', position:'absolute', left:this.x(v.x)}}>
                        {exp}
                        <svg width={24} height={24}
                             style={{ display:'inline-block', verticalAlign: 'middle'}}
                             onDoubleClick={this.node_double_click(v.id)}>
                            <use key={key++}
                                 xlinkHref={'#' + v.type}
                                 style={{stroke:c, fill:c}}
                                 onClick={this.node_click(v.id)}/>
                        </svg>
                    </a>
                    <div
                        contentEditable={true}
                        style={{position:'relative', display:'block', marginLeft:5, outline: 'none', wordWrap: 'break-word'}}>
                                {v.name}
                    </div>

                </div>);

            //els.push(<use key={key++} xlinkHref={'#' + v.type} transform="scale(1)"  x={this.x(v.x)} y={this.y(v.y)} style={{stroke:c, fill:c}} onDoubleClick={this.node_double_click(v.id)} onClick={this.node_click(v.id)} />);
            //lbls.push(<text key={key++} x={this.x(v.x) + 15} y={this.y(v.y)} dy="5" style={{fill:c}} onClick={this.node_click(v.id)}>{v.name}</text>);

            // if(v.expand_state == vs.c.expand_state.EXPANDED)
            // {
            //     expands.push(<use key={key++} xlinkHref={'#_expanded'} transform="scale(1)" x={this.x(v.x)-20} y={this.y(v.y)} style={{stroke:color, fill:color}} onClick={this.node_collapse.bind(v.id)} />);
            // }
            // else if(v.expand_state == vs.c.expand_state.COLLAPSED)
            // {
            //     expands.push(<use key={key++} xlinkHref={'#_collapsed'} transform="scale(1)" x={this.x(v.x)-20} y={this.y(v.y)} style={{stroke:color, fill:color}} onClick={this.node_expand.bind(v.id)}/>);
            // }

        });

        // let links = vs.refs.map((i)=>
        // {
        //     let d = "";
        //
        //     if(i.x2 > i.x1)// для потомков
        //     {
        //         d += "M" + (this.x(i.x1) + 8) + " " + (this.y(i.y1) + 8);
        //         d += " L " + (this.x(i.x2) - 9) + " " + (this.y(i.y2) - 9);
        //     }
        //     else if(i.x2 == i.x1) // для узлов на одном уровне
        //     {
        //         d += "M" + this.x(i.x1) + " " + (this.y(i.y1) + 11);
        //         d += " L " + this.x(i.x2) + " " + (this.y(i.y2) - 12);
        //     }
        //     else if(i.x2 < i.x1 && i.y2 > i.y1 )// для следующих на уровень выше
        //     {
        //         d += "M" + (this.x(i.x1) - 8) + " " + (this.y(i.y1) + 8);
        //         d += " L " + (this.x(i.x2) + 9) + " " + (this.y(i.y2) - 9);
        //     }
        //     else if(i.x2 < i.x1 && i.y2 < i.y1) // для циклов (возврат к предыдущим на уровень выше)
        //     {
        //
        //     }
        //     return <path key={key++} d={d} stroke={'#CFD8DC'} strokeWidth={1} fill="none" markerEnd="url(#arrow)"></path>
        // })

        return (
                <div className={this.props.className} style={{width:'100%', height:'99%'}} onClick={()=>{ vs.select_node(null);}}>
                    {els}
                </div>
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
            alert("ok");
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

/*

* */


/*
 <use xlinkHref="#if" y="50" x="50" style={{stroke:'#ffffff', fill:'#ffffff'}} />
 <use xlinkHref="#else" y="80" x="50" style={{stroke:'#ffffff', fill:'#ffffff'}}/>
 <use xlinkHref="#switch" y="110" x="50" style={{stroke:'#ffffff', fill:'#ffffff'}}/>
 <use xlinkHref="#switch" y="140" x="50" style={{stroke:'#ffffff', fill:'#ffffff'}}/>
 <use xlinkHref="#switch" y="170" x="50" style={{stroke:'#ffffff', fill:'#ffffff'}}/>
 <use xlinkHref="#op" y="200" x="50" style={{stroke:'#ffffff', fill:'#ffffff'}}/>
 <use xlinkHref="#and" y="230" x="50" style={{stroke:'#ffffff', fill:'#ffffff'}}/>
 <use xlinkHref="#or" y="260" x="50" style={{stroke:'#ffffff', fill:'#ffffff'}}/>
 <use xlinkHref="#call" y="290" x="50" style={{stroke:'#ffffff', fill:'#ffffff'}}/>
 <use xlinkHref="#while" y="320" x="50" style={{stroke:'#ffffff', fill:'#ffffff'}}/>
* */
