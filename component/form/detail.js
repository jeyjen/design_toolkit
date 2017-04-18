import React from 'react';
import component from '../../engine/component';

import TextField from 'material-ui/TextField';
import IconClear from 'material-ui/svg-icons/content/clear';
import IconDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import IconUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import IconRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import IconButton from 'material-ui/IconButton';


import vs from '../view_store';

class detail extends component {
    constructor(props) {
        super(props);
        this.state =
        {}
    }

    componentDidMount()
    {
        this.on(vs, vs.e.on_selected_node_changed);

    }

    componentWillUnmount()
    {
        this.off(vs, vs.e.on_selected_node_changed);
    }

    render() {

        let node = vs.get_node_by_id(vs.selected_node_id_1);
        let name = node == null? "" : node.name;

        return (
            <section style={{width:'100%', height:'100%'}}>
                <section>
                    <IconButton
                        onTouchTap={()=>{vs.add_child()}}
                        touch={true} >
                        <IconRight />
                    </IconButton>
                    <IconButton
                        onTouchTap={()=>{vs.add_next()}}
                        touch={true} >
                        <IconDown />
                    </IconButton>
                    <IconButton
                        onTouchTap={()=>{vs.delete_node()}}
                        touch={true} >
                        <IconClear />
                    </IconButton>
                </section>
                <section>
                    <IconButton
                        onTouchTap={()=>{vs.set_type(vs.c.type.IF)}}
                        touch={true} >
                        <svg width="24px" height="24px">
                            <path id="if" d="m 12,6 -6,6 6,6 6,-6 z"/>
                            <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", stroke:'#000000', strokeWidth:2}}/>
                        </svg>
                    </IconButton>
                    <IconButton
                        onTouchTap={()=>{vs.set_type(vs.c.type.IFELSE)}}
                        touch={true} >
                        <svg width="24px" height="24px">
                            <path id="else" d="m 6,10 v 4 h 12 v -4 z" />
                            <ellipse id="circle" cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", stroke:'#000000', strokeWidth:2}}/>
                        </svg>
                    </IconButton>
                    <IconButton
                        onTouchTap={()=>{vs.set_type(vs.c.type.SELECTOR)}}
                        touch={true} >
                        <svg width="24px" height="24px">
                            <path id="big" d="m 10,10 v 4 h 8 v -4 z"/>
                            <path id="small" d="m 6,10 v 4 h 2 v -4 z" />
                            <ellipse id="sel" cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", stroke:'#000000', strokeWidth:2}}/>
                        </svg>
                    </IconButton>
                    <IconButton
                        onTouchTap={()=>{vs.set_type(vs.c.type.OPERATION)}}
                        touch={true} >
                        <svg width="24px" height="24px">
                            <circle r="6" cx="12" cy="12"/>
                            <ellipse id="op" cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", stroke:'#000000', strokeWidth:2}}/>
                        </svg>
                    </IconButton>
                    <IconButton
                        onTouchTap={()=>{vs.set_type(vs.c.type.AND)}}
                        touch={true} >
                        <svg width="24px" height="24px">
                            <path d="m 12,7 5,9 H 15 L 12,10 9,16 H 7 Z"/>
                            <ellipse id="and" cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", stroke:'#000000', strokeWidth:2}}/>
                        </svg>
                    </IconButton>
                    <IconButton
                        onTouchTap={()=>{vs.set_type(vs.c.type.OR)}}
                        touch={true} >
                        <svg width="24px" height="24px">
                            <path d="M 12,17 17,8 H 15 L 12,14 9,8 H 7 Z"/>
                            <ellipse id="or" cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", stroke:'#000000', strokeWidth:2}}/>
                        </svg>
                    </IconButton>
                </section>
                <section>
                    <IconButton
                        onTouchTap={()=>{vs.set_type(vs.c.type.COMMAND)}}
                        touch={true} >
                        <svg width="24px" height="24px">
                            <path id="mirror" d="m 18,12 -4,4 V 8 Z"/>
                            <path id="line" d="M 14,10 H 6 v 4 h 8 z"/>
                            <ellipse id="call" cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", stroke:'#000000', strokeWidth:2}}/>
                        </svg>
                    </IconButton>
                    <IconButton
                        onTouchTap={()=>{vs.set_type(vs.c.type.WHILE)}}
                        touch={true} >
                        <svg width="24px" height="24px">
                            <path id="pie" d="M 15.828931,8.2743906 C 14.859541,7.3050025 13.529131,6.7033135 12.051653,6.7033135 9.0966975,6.7033135 6.71,9.096698 6.71,12.051653 6.71,15.006617 9.0966975,17.4 12.051653,17.4 c 2.493663,0 4.572841,-1.704788 5.167846,-4.011262 h -1.390568 c -0.548206,1.557714 -2.03237,2.674182 -3.777278,2.674182 -2.2128726,0 -4.0112533,-1.798381 -4.0112533,-4.011267 0,-2.212875 1.7983807,-4.0112533 4.0112533,-4.0112533 1.109791,0 2.099229,0.4612943 2.82126,1.1900069 L 12.720191,11.383109 H 17.4 V 6.7033135 Z"/>
                            <ellipse id="while" cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", stroke:'#000000', strokeWidth:2}}/>
                        </svg>
                    </IconButton>
                    <IconButton
                        onTouchTap={()=>{vs.set_type(vs.c.type.REQUEST)}}
                        touch={true} >
                        <svg width="24px" height="24px">
                            <path id="mirror" d="m 18,12 -4,4 V 8 Z"/>
                            <ellipse id="while" cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", stroke:'#000000', strokeWidth:2}}/>
                        </svg>
                    </IconButton>

                    <IconButton
                        onTouchTap={()=>{vs.set_type(vs.c.type.PROCESS)}}
                        touch={true} >
                        <svg width="24px" height="24px">
                            <ellipse id="while" cx="12" cy="12" rx="9" ry="9" style={{fillOpacity:".01", stroke:'#000000', strokeWidth:2}}/>
                        </svg>
                    </IconButton>

                </section>
                <section style={{padding:13}}>
                    <TextField
                        hintText="..."
                        floatingLabelText="название"
                        floatingLabelFixed={true}
                        fullWidth={true}
                        value={name}
                        onChange={(e, v)=>{vs.update_node({name:v})}}
                    />
                    <TextField
                        hintText="..."
                        floatingLabelText="описание"
                        floatingLabelFixed={true}
                        multiLine={true}
                        fullWidth={true}
                        rows={3}
                    />
                </section>
                
            </section>

        );
    }

}

export default detail;

/*




 <g id="proc" transform="translate(-12,-12)">

 </g>



* */

/*
 <SelectField
 value={ps.state.sel_cash_product}
 floatingLabelText="продукт"
 floatingLabelFixed={true}
 hintText="..."
 fullWidth={true}
 onChange={(e,i,v)=>{ps.set_cash_name(v)}}>
 >
 <IconButton
 onTouchTap={()=>{ps.set_cash_name(null)}}
 touch={true} >
 <IconClear />
 </IconButton>
 {
 //ps.state.cash_products.map((i)=>
 //{
 //    return <MenuItem key={i} value={i} primaryText={i} />
 //})
 }
 </SelectField>;
* */