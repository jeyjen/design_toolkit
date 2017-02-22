import React from 'react';
import component from '../../engine/component';
import vs from '../../store/view_store';

class node_hierarchy extends component {
    constructor(props) {
        super(props);
        this.state =
        {
            x_offset: this.props.x_offset === undefined? 7: this.props.x_offset,
            y_offset: this.props.y_offset === undefined? 22: this.props.y_offset
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
        let key = 1;

        let c = color;
        let x = 0;
        let y = 0;
        for(let i = 0; i < vs.visual_parents.length; i++)
        {
            x++;
            y++;
            let n = vs.nodes.get(vs.visual_parents[i]);
            let type = vs.types.get(n.type);
            els.push(<use key={key++} xlinkHref={'#' + type} transform="scale(1)" x={this.x(x)} y={this.y(y)} style={{stroke:c, fill:c}} onDoubleClick={this.node_double_click(n.id)} onClick={this.node_click(n.id)} />);
            lbls.push(<text key={key++} x={this.x(x) + 15} y={this.y(y)} dy="5" style={{fill:c}} onClick={this.node_click(n.id)}>{n.name}</text>);
        }
        return (
                <svg className={this.props.className} style={{width:'100%', height:'100%'}} onClick={()=>{ vs.select_node(null);}}>
                    <defs>
                        <marker id="arrow" viewBox=" 0 0 10 10" markerWidth="5" markerHeight="5" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L6,3 z" fill={color} />
                        </marker>
                        <g id="_none" transform="translate(-12,-12)">
                            <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                        </g>
                        <g id="_operation" transform="translate(-12,-12)">
                            <circle r="6" cx="12" cy="12"/>
                            <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                        </g>
                        <g id="_if" transform="translate(-12,-12)">
                            <path d="m 12,6 -6,6 6,6 6,-6 z"/>
                            <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                        </g>
                        <g id="_ifelse" transform="translate(-12,-12)">
                            <path d="m 6,10 v 4 h 12 v -4 z" />
                            <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                        </g>
                        <g id="_selector" transform="translate(-12,-12)">
                            <path id="big" d="m 10,10 v 4 h 8 v -4 z"/>
                            <path id="small" d="m 6,10 v 4 h 2 v -4 z" />
                            <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                        </g>
                        <g id="_and" transform="translate(-12,-12)">
                            <path d="m 12,7 5,9 H 15 L 12,10 9,16 H 7 Z"/>
                            <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                        </g>
                        <g id="_or" transform="translate(-12,-12)">
                            <path d="M 12,17 17,8 H 15 L 12,14 9,8 H 7 Z"/>
                            <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                        </g>
                        <g id="_command" transform="translate(-12,-12)">
                            <path d="m 18,12 -4,4 V 8 Z"/>
                            <path d="M 14,10 H 6 v 4 h 8 z"/>
                            <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                        </g>
                        <g id="_request" transform="translate(-12,-12)">
                            <path d="m 18,12 -4,4 V 8 Z"/>
                            <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                        </g>
                        <g id="_while" transform="translate(-12,-12)">
                            <path d="M 15.828931,8.2743906 C 14.859541,7.3050025 13.529131,6.7033135 12.051653,6.7033135 9.0966975,6.7033135 6.71,9.096698 6.71,12.051653 6.71,15.006617 9.0966975,17.4 12.051653,17.4 c 2.493663,0 4.572841,-1.704788 5.167846,-4.011262 h -1.390568 c -0.548206,1.557714 -2.03237,2.674182 -3.777278,2.674182 -2.2128726,0 -4.0112533,-1.798381 -4.0112533,-4.011267 0,-2.212875 1.7983807,-4.0112533 4.0112533,-4.0112533 1.109791,0 2.099229,0.4612943 2.82126,1.1900069 L 12.720191,11.383109 H 17.4 V 6.7033135 Z"/>
                            <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                        </g>
                        <g id="_process" transform="translate(-12,-12)">
                            <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                        </g>
                    </defs>
                    {els}
                    {lbls}
                </svg>
        );
    }

    x(x)
    {
        return this.state.x_offset * x + 10;
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
}
export default node_hierarchy;

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
