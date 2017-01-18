import component from '../../engine/component';
import vs from '../../store/view_store';

class dia extends component {
    constructor(props) {
        super(props);
        this.state =
        {
            x_offset: this.props.x_offset === undefined? 25: this.props.x_offset,
            y_offset: this.props.y_offset === undefined? 30: this.props.y_offset
        };
    }
    componentDidMount()
    {
        this.on(vs, vs.e.on_selected_set_updated);

    }
    componentWillUnmount()
    {
        this.off(vs, vs.e.on_selected_set_updated);
    }
    
    render()
    {
        let color = this.props.node_color === undefined? '#546E7A': this.props.node_color;
        let els = [];
        let lbls = [];
        vs.v_nodes.forEach((v, k, m)=>
        {
            let c = vs.selected_nodes.has(v['id'])? '#FB8C00': color;
            els.push(<use xlinkHref={'#' + v['type']} transform="scale(1)"  x={this.x(v['x'])} y={this.y(v['y'])} style={{stroke:c, fill:c}} onClick={this.node_click(v)} />);
            lbls.push(<text x={this.x(v['x']) + 15} y={this.y(v['y'])} dy="5" style={{fill:c}}>{v['name']}</text>);
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




            /*
             let result = "M " + d.s.x + " " + d.s.y;
             result += " L " + (d.s.x - 13) + " " + (d.s.y + 13);
             result += " L " + (d.t.x - 20) + " " + (d.s.y + 13);
             result += " L " + (d.t.x - 20) + " " + (d.t.y);
             result += " L " + (d.t.x - squareSize/2) + " " + (d.t.y);
             return result;
            * */

            console.log(d);

            return <path d={d} stroke={'#CFD8DC'} strokeWidth={1} fill="none" markerEnd="url(#arrow)"></path>
        })

        // отрисовать стрелки

        return (
            <svg style={this.props.style}>
                <defs>
                    <marker id="arrow" viewBox=" 0 0 10 10" markerWidth="5" markerHeight="5" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L6,3 z" fill="#ffffff" />
                    </marker>
                    <g id="if" transform="translate(-12,-12)">
                        <path id="if" d="m 12,6 -6,6 6,6 6,-6 z"  width="100px" height="100px"/>
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', strokeWidth:2}}/>
                    </g>
                    <g id="else" transform="translate(-12,-12)">
                        <path id="else" d="m 6,10 v 4 h 12 v -4 z" />
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', strokeWidth:2}}/>
                    </g>
                    <g id="sel" transform="translate(-12,-12)">
                        <path id="big" d="m 10,10 v 4 h 8 v -4 z"/>
                        <path id="small" d="m 6,10 v 4 h 2 v -4 z" />
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', strokeWidth:2}}/>
                    </g>
                    <g id="op" transform="translate(-12,-12)">
                        <circle r="6" cx="12" cy="12"/>
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', strokeWidth:2}}/>
                    </g>
                    <g id="and" transform="translate(-12,-12)">
                        <path id="and" d="m 12,7 5,9 H 15 L 12,10 9,16 H 7 Z"/>
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', strokeWidth:2}}/>
                    </g>
                    <g id="or" transform="translate(-12,-12)">
                        <path id="or" d="M 12,17 17,8 H 15 L 12,14 9,8 H 7 Z"/>
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', strokeWidth:2}}/>
                    </g>
                    <g id="call" transform="translate(-12,-12)">
                        <path id="mirror" d="m 18,12 -4,4 V 8 Z"/>
                        <path id="line" d="M 14,10 H 6 v 4 h 8 z"/>
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', strokeWidth:2}}/>
                    </g>
                    <g id="while" transform="translate(-12,-12)">
                        <path id="pie" d="M 15.828931,8.2743906 C 14.859541,7.3050025 13.529131,6.7033135 12.051653,6.7033135 9.0966975,6.7033135 6.71,9.096698 6.71,12.051653 6.71,15.006617 9.0966975,17.4 12.051653,17.4 c 2.493663,0 4.572841,-1.704788 5.167846,-4.011262 h -1.390568 c -0.548206,1.557714 -2.03237,2.674182 -3.777278,2.674182 -2.2128726,0 -4.0112533,-1.798381 -4.0112533,-4.011267 0,-2.212875 1.7983807,-4.0112533 4.0112533,-4.0112533 1.109791,0 2.099229,0.4612943 2.82126,1.1900069 L 12.720191,11.383109 H 17.4 V 6.7033135 Z"/>
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', strokeWidth:2}}/>
                    </g>
                    <g id="proc" transform="translate(-12,-12)">
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', strokeWidth:1}}/>
                    </g>
                </defs>
                {links}
                {els}
                {lbls}
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

    node_click(node)
    {
        return function (e, id) {
            e.persist();
            console.log(node);
            console.log(id);
            console.log(e);
            console.log(this);
            vs.tap_node(node.id);
        }.bind(this)
    }
}
export default dia;

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
