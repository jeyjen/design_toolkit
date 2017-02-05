import React from 'react';
import component from '../../engine/component';
import ps from '../../store/example_store';
import po from '../../operation/remote';
import co from '../operation/common';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

import IconClear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';

import Flexbox from '../../control/flex';

class filter extends component {
    constructor(props) {
        super(props);
        this.state =
        {}
    }

    componentDidMount()
    {
        this.subscribe(ps, ps.event.on_product_type_changed, ()=>
        {
            if(ps.state.sel_type != null)
            {
                if(cs.state.sel_contour != null)
                {
                    po.load_products();
                }
                po.load_attributes();
                po.load_templates();
            }
            co.define_attributes(null);

            this.setState(this.state);
        });
        this.subscribe(ps, ps.event.on_filter_changed);
        this.subscribe(ps, ps.event.on_tariff_changed);
        this.subscribe(ps, ps.event.on_tariff_plan_changed);
        this.subscribe(ps, ps.event.on_currency_changed);
        this.subscribe(ps, ps.event.on_card_changed);
        this.subscribe(ps, ps.event.on_design_changed);
        this.subscribe(ps, ps.event.on_param_changed);
        this.subscribe(ps, ps.event.on_action_changed);
        this.subscribe(ps, ps.event.on_segment_changed);
        this.subscribe(ps, ps.event.on_cash_changed);
        this.subscribe(ps, ps.event.on_is_active_changed);
    }

    componentWillUnmount()
    {

    }

    render() {
        let filter = null;
        let style=
        {
            whiteSpace:'nowrap',
            textOverflow:'ellipsis',
            overflow:'hidden'
        }
        if(ps.state.sel_type == 26 || ps.state.sel_type == 23)
        {
            filter = <section
                flexDirection="column"
            >
                <SelectField
                    value={ps.state.sel_tariff_plan}
                    floatingLabelText="тарифный план"
                    floatingLabelFixed={true}
                    hintText="..."
                    fullWidth={true}
                    style={style}
                    onChange={(e,i,v)=>{ps.set_tariff_plan(v)}}>
                    <IconButton
                        onTouchTap={()=>{ps.set_tariff_plan(null)}}
                        touch={true} >
                        <IconClear />
                    </IconButton>
                    {ps.state.tariff_plans.map((i)=>
                    {
                        return <MenuItem key={i} value={i} primaryText={i} />
                    })}
                </SelectField>

                <SelectField
                    value={ps.state.sel_tariff}
                    disabled={ps.state.sel_tariff_plan == null}
                    floatingLabelText="тариф"
                    floatingLabelFixed={true}
                    style={style}
                    hintText="..."
                    fullWidth={true}
                    onChange={(e,i,v)=>{ps.set_tariff(v)}}>
                    <IconButton
                        onTouchTap={()=>{ps.set_tariff(null)}}
                        touch={true} >
                        <IconClear />
                    </IconButton>
                    {ps.state.tariffs.map((i)=>
                    {
                        return <MenuItem key={i} value={i} primaryText={i} />
                    })}
                </SelectField>
                <SelectField
                    value={ps.state.sel_card}
                    disabled={ps.state.sel_tariff == null}
                    floatingLabelText="карта"
                    floatingLabelFixed={true}
                    style={style}
                    hintText="..."
                    fullWidth={true}
                    onChange={(e,i,v)=>{ps.set_card(v)}}>
                    <IconButton
                        onTouchTap={()=>{ps.set_card(null)}}
                        touch={true} >
                        <IconClear />
                    </IconButton>
                    {ps.state.cards.map((i)=>
                    {
                        return <MenuItem key={i} value={i} primaryText={i} />
                    })}
                </SelectField>
                <SelectField
                    value={ps.state.sel_design}
                    disabled={ps.state.sel_card == null}
                    floatingLabelText="дизайн"
                    floatingLabelFixed={true}
                    style={style}
                    hintText="..."
                    fullWidth={true}
                    onChange={(e,i,v)=>{ps.set_design(v)}}>
                    <IconButton
                        onTouchTap={()=>{ps.set_design(null)}}
                        touch={true} >
                        <IconClear />
                    </IconButton>
                    {ps.state.designs.map((i)=>
                    {
                        return <MenuItem key={i} value={i} primaryText={i} />
                    })}
                </SelectField>
                <SelectField
                    value={ps.state.sel_currency}
                    disabled={ps.state.sel_card == null}
                    floatingLabelText="валюта"
                    floatingLabelFixed={true}
                    style={style}
                    hintText="..."
                    fullWidth={true}
                    onChange={(e,i,v)=>{ps.set_currency(v)}}>
                    <IconButton
                        onTouchTap={()=>{ps.set_currency(null)}}
                        touch={true} >
                        <IconClear />
                    </IconButton>
                    {ps.state.currencies.map((i)=>
                    {
                        return <MenuItem key={i} value={i} primaryText={i} />
                    })}
                </SelectField>
                <SelectField
                    value={ps.state.sel_action}
                    disabled={ps.state.sel_card == null}
                    floatingLabelText="акция"
                    floatingLabelFixed={true}
                    style={style}
                    hintText="..."
                    fullWidth={true}
                    onChange={(e,i,v)=>{ps.set_action(v)}}>
                    <IconButton
                        onTouchTap={()=>{ps.set_action(null)}}
                        touch={true} >
                        <IconClear />
                    </IconButton>
                    {ps.state.actions.map((i)=>
                    {
                        return <MenuItem key={i} value={i} primaryText={i} />
                    })}
                </SelectField>
                <SelectField
                    value={ps.state.sel_segment}
                    disabled={ps.state.sel_card == null}
                    floatingLabelText="сегмент"
                    floatingLabelFixed={true}
                    style={style}
                    hintText="..."
                    fullWidth={true}
                    onChange={(e,i,v)=>{ps.set_segment(v)}}>
                    <IconButton
                        onTouchTap={()=>{ps.set_segment(null)}}
                        touch={true} >
                        <IconClear />
                    </IconButton>
                    {ps.state.segments.map((i)=>
                    {
                        return <MenuItem key={i} value={i} primaryText={i} />
                    })}
                </SelectField>
                <SelectField
                    value={ps.state.sel_design}
                    disabled={ps.state.sel_card == null}
                    floatingLabelText="параметр"
                    floatingLabelFixed={true}
                    style={style}
                    hintText="..."
                    fullWidth={true}
                    onChange={(e,i,v)=>{ps.set_param(v)}}>
                    <IconButton
                        onTouchTap={()=>{ps.set_param(null)}}
                        touch={true} >
                        <IconClear />
                    </IconButton>
                    {ps.state.params.map((i)=>
                    {
                        return <MenuItem key={i} value={i} primaryText={i} />
                    })}
                </SelectField>

            </section>;
        }
        return (
            <Flexbox
                flexDirection="column"
                justifyContent="center"
                alignItems="stretch"
                margin="7px"
            >
                <SelectField
                    value={ps.state.sel_type}
                    floatingLabelText="тип"
                    floatingLabelFixed={true}
                    style={style}
                    hintText="..."
                    fullWidth={true}
                    //disabled={state.sel_contour == null}
                    onChange={(e, i, v)=>{ps.set_type(v)}}>
                    {ps.state.product_types.map((i)=>
                    {
                        return <MenuItem key={i.id} value={i.id} primaryText={i.name} />
                    })}
                </SelectField>
                <Toggle
                    label="активные"
                    labelPosition="right"
                    toggled={ps.state.is_active}
                    onToggle={(e,v)=>{ps.set_is_active(v)}}
                />
                {filter}
            </Flexbox>
        );
    }

}

export default filter;

/*

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