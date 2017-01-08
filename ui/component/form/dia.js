import component from '../../engine/component';
class dia extends component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount()
    {}
    componentWillUnmount()
    {}
    render()
    {
        return (
            <svg viewBox="0 0 600 600" width="600px" height="600px" style={{backgroundColor:'#7563c6'}}>
                <defs>
                    <g id="if">
                        <path id="if" d="m 12,6 -6,6 6,6 6,-6 z"/>
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', stroke:'#000000', strokeWidth:2}}/>
                    </g>
                    <g
                        id="else">
                        <path id="else" d="m 6,10 v 4 h 12 v -4 z" />
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', stroke:'#000000', strokeWidth:2}}/>
                    </g>
                    <g id="switch">
                        <path id="big" d="m 10,10 v 4 h 8 v -4 z"/>
                        <path id="small" d="m 6,10 v 4 h 2 v -4 z" />
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', stroke:'#000000', strokeWidth:2}}/>
                    </g>
                    <g id="op">
                        <circle r="6" cx="12" cy="12"/>
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', stroke:'#000000', strokeWidth:2}}/>
                    </g>
                    <g
                        id="and"
                        >
                        <path id="and" d="m 12,7 5,9 H 15 L 12,10 9,16 H 7 Z"/>
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', stroke:'#000000', strokeWidth:2}}/>
                    </g>
                    <g
                        id="or"
                    >
                        <path id="or" d="M 12,17 17,8 H 15 L 12,14 9,8 H 7 Z"/>
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', stroke:'#000000', strokeWidth:2}}/>
                    </g>
                    <g id="call">
                        <path id="mirror" d="m 18,12 -4,4 V 8 Z"/>
                        <path id="line" d="M 14,10 H 6 v 4 h 8 z"/>
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', stroke:'#000000', strokeWidth:2}}/>
                    </g>
                    <g id="while">
                        <path id="pie" d="M 15.828931,8.2743906 C 14.859541,7.3050025 13.529131,6.7033135 12.051653,6.7033135 9.0966975,6.7033135 6.71,9.096698 6.71,12.051653 6.71,15.006617 9.0966975,17.4 12.051653,17.4 c 2.493663,0 4.572841,-1.704788 5.167846,-4.011262 h -1.390568 c -0.548206,1.557714 -2.03237,2.674182 -3.777278,2.674182 -2.2128726,0 -4.0112533,-1.798381 -4.0112533,-4.011267 0,-2.212875 1.7983807,-4.0112533 4.0112533,-4.0112533 1.109791,0 2.099229,0.4612943 2.82126,1.1900069 L 12.720191,11.383109 H 17.4 V 6.7033135 Z"/>
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fill:'none', stroke:'#000000', strokeWidth:2}}/>
                    </g>
                </defs>
                <use xlinkHref="#if" y="50" x="50" />
                <use xlinkHref="#else" y="80" x="50" />
                <use xlinkHref="#switch" y="110" x="50" />
                <use xlinkHref="#switch" y="140" x="50" />
                <use xlinkHref="#switch" y="170" x="50" />
                <use xlinkHref="#op" y="200" x="50" />
                <use xlinkHref="#and" y="230" x="50" />
                <use xlinkHref="#or" y="260" x="50" />
                <use xlinkHref="#call" y="290" x="50" />
                <use xlinkHref="#while" y="320" x="50" />
            </svg>
        );
    }
}
export default dia;
