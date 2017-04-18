import React from 'react';

class icon extends React.Component
{
    render() {
        return (
            <svg width={0} height={0} display="none">
                <symbol id="arrow">
                    <marker viewBox=" 0 0 10 10" markerWidth="5" markerHeight="5" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L6,3 z" fill={'#000000'} />
                    </marker>
                </symbol>
                <symbol id="_empty">
                </symbol>
                <symbol id="_collapsed">
                        <path d="m 12,9 h -1 v 5 h 1 z" />
                        <path d="M 14,11 H 9 v 1 h 5 z" />
                        <circle r="5" cx="11.5" cy="11.5" style={{fillOpacity:".01", strokeWidth:1}}/>
                </symbol>
                <symbol id="_expanded">
                        <path d="M 14,11 H 9 v 1 h 5 z" />
                        <circle r="5" cx="11.5" cy="11.5" style={{fillOpacity:".01", strokeWidth:1}}/>
                </symbol>
                <symbol id="_none">
                        <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                </symbol>
                <symbol id="_if">
                        <path d="m 12,6 -6,6 6,6 6,-6 z"/>
                        <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                </symbol>
                <symbol id="_operation">
                    <circle r="6" cx="12" cy="12"/>
                    <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                </symbol>
                <symbol id="_ifelse">
                        <path d="m 6,10 v 4 h 12 v -4 z" />
                        <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                </symbol>
                <symbol id="_selector">
                        <path id="big" d="m 10,10 v 4 h 8 v -4 z"/>
                        <path id="small" d="m 6,10 v 4 h 2 v -4 z" />
                        <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                </symbol>
                <symbol id="_and">
                        <path d="m 12,7 5,9 H 15 L 12,10 9,16 H 7 Z"/>
                        <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                </symbol>
                <symbol id="_or">
                        <path d="M 12,17 17,8 H 15 L 12,14 9,8 H 7 Z"/>
                        <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                </symbol>
                <symbol id="_command">
                        <path d="m 18,12 -4,4 V 8 Z"/>
                        <path d="M 14,10 H 6 v 4 h 8 z"/>
                        <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                </symbol>
                <symbol id="_request">
                        <path d="m 18,12 -4,4 V 8 Z"/>
                        <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                </symbol>
                <symbol id="_while">
                        <path d="M 15.828931,8.2743906 C 14.859541,7.3050025 13.529131,6.7033135 12.051653,6.7033135 9.0966975,6.7033135 6.71,9.096698 6.71,12.051653 6.71,15.006617 9.0966975,17.4 12.051653,17.4 c 2.493663,0 4.572841,-1.704788 5.167846,-4.011262 h -1.390568 c -0.548206,1.557714 -2.03237,2.674182 -3.777278,2.674182 -2.2128726,0 -4.0112533,-1.798381 -4.0112533,-4.011267 0,-2.212875 1.7983807,-4.0112533 4.0112533,-4.0112533 1.109791,0 2.099229,0.4612943 2.82126,1.1900069 L 12.720191,11.383109 H 17.4 V 6.7033135 Z"/>
                        <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                </symbol>
                <symbol id="_process">
                    <ellipse cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", strokeWidth:2}}/>
                </symbol>
           </svg>
        );
    }
}

export default icon;