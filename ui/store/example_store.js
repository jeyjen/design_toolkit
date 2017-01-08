import store from '../engine/store';

class product_store extends store
{
    constructor()
    {
        super();

        this.event =
        {
            on_product_set_changed: 'on_product_set_changed',
            on_filter_changed: 'on_filter_changed',
            on_product_type_changed: 'on_product_type_changed',
            on_tariff_changed: 'on_tariff_changed',
            on_tariff_plan_changed:'on_tariff_plan_changed',
            on_currency_changed:'on_currency_changed',
            on_card_changed:'on_card_changed',
            on_design_changed:'on_design_changed',
            on_action_changed:'on_action_changed',
            on_param_changed:'on_param_changed',
            on_segment_changed:'on_segment_changed',
            on_product_changed:'on_product_changed',
            on_cash_changed:'on_cash_changed',
            on_is_active_changed:'on_is_active_changed'
        }
        this.state=
        {
            product_types:
                [
                    {id:13, name:"кэш"},
                    {id:26, name:"карта без лимита"},
                    {id:23, name:"кредитная карта"},
                ],
            is_active: true,
            sel_product: null,
            sel_type: null,
            products:[],
            filtered_products:[],
            type: null,
            sel_tariff: null,
            tariffs: [],
            sel_tariff_plan: null,
            tariff_plans:[],
            sel_currency: null,
            currencies: [],
            sel_card: null,
            cards:[],
            sel_design: null,
            designs:[],
            sel_action: null,
            actions:[],
            sel_param: null,
            params:[],
            sel_segment: null,
            segments:[]
        }
    }

    set_products(products)
    {
        this.state.products = products;
        if(this.state.sel_type == 26 || this.state.sel_type == 23)
        {
            this.state.sel_tariff_plan = null;
            this.define_tariff_plans();
        }
        else if(this.state.sel_type == 13)
        {
            this.state.sel_cash_product = null;
            this.define_cash_product();
        }
    }

    define_cash_product()
    {
        this.state.filtered_products.length = 0;
        this.state.products.forEach((i)=>
        {
            if(this.state.is_active == true && i.is_obsolete.length > 0)
            {
                return;
            }
            this.state.filtered_products.push(i);
        });
        this.emit(this.event.on_product_set_changed);
    }

    apply_card_filter()
    {
        this.set_product(null);
        this.state.filtered_products.length = 0;
        if(this.state.sel_tariff != null)
        {
            this.state.products.forEach((i)=>
            {
                let include = true;
                if(this.state.is_active == true && i.is_obsolete.length > 0)
                {
                    return;
                }

                if(this.state.sel_tariff != null && this.state.sel_tariff != i.tariff)
                    include = false;
                if(this.state.sel_tariff_plan != null && this.state.sel_tariff_plan != i.tariff_plan)
                    include = false;
                if(this.state.sel_currency != null && this.state.sel_currency != i.currency)
                    include = false;
                if(this.state.sel_card != null && this.state.sel_card != i.card)
                    include = false;
                if(this.state.sel_design != null && this.state.sel_design != i.design)
                    include = false;
                if(this.state.sel_action!= null && this.state.sel_action != i.action)
                    include = false;
                if(this.state.sel_param != null && this.state.sel_param != i.param)
                    include = false;
                if(this.state.sel_segment != null && this.state.sel_segment != i.segment)
                    include = false;

                if(include)
                {
                    this.state.filtered_products.push(i);
                }
            });
        }

        this.emit(this.event.on_product_set_changed);
    }

    define_tariff_plans()
    {
        let tariff_plan_set = new Set();
        this.state.products.forEach((i)=>
        {
            if(i.tariff_plan == null)
                return;
            if(! tariff_plan_set.has(i.tariff_plan))
                tariff_plan_set.add(i.tariff_plan);
        });
        this.state.tariff_plans.length = 0;
        tariff_plan_set.forEach((v)=>
        {
            this.state.tariff_plans.push(v);
        });
        this.emit(this.event.on_filter_changed);
    }
    // заолнить достпные параметры

    set_type(type)
    {
        this.state.sel_type = type;

        if(type == 23 || type == 26)
        {
            this.set_tariff_plan(null);
        }
        this.emit(this.event.on_product_type_changed);
        this.set_product(null);
    }
    set_tariff_plan(value)
    {
        this.state.sel_tariff_plan = value;
        this.emit(this.event.on_tariff_plan_changed);
        this.define_tariffs();
        this.apply_card_filter();
    }

    define_tariffs()
    {
        if(this.state.sel_tariff_plan == null)
        {
            this.set_tariff(null);
            return;
        }
        let tariff_set = new Set();
        this.state.products.forEach((i)=>
        {
            if(i.tariff == null)
                return;
            // tariff
            if(
                this.state.sel_tariff_plan == i.tariff_plan
                && ! tariff_set.has(i.tariff))
                tariff_set.add(i.tariff);
        });
        this.state.tariffs.length = 0;
        tariff_set.forEach((v)=>
        {
            this.state.tariffs.push(v);
        });

        if(this.state.sel_tariff != null && ! tariff_set.has(this.state.sel_tariff))
        {
            this.set_tariff(null);
        }
        this.emit(this.event.on_filter_changed);
    }

    set_tariff(value)
    {
        this.state.sel_tariff = value;
        this.emit(this.event.on_tariff_changed);
        this.define_cards();
        this.apply_card_filter();
    }

    define_cards()
    {
        if(this.state.sel_tariff == null)
        {
            this.set_card(null);
            return;
        }
        let card_set = new Set();
        this.state.products.forEach((i)=>
        {
            if(i.card == null)
                return;
            // tariff
            if(this.state.sel_tariff_plan == i.tariff_plan
                && this.state.sel_tariff == i.tariff && ! card_set.has(i.card))
                card_set.add(i.card);
        });
        this.state.cards.length = 0;
        card_set.forEach((v)=>
        {
            this.state.cards.push(v);
        });

        if(this.state.sel_card != null && ! card_set.has(this.state.sel_card))
        {
            this.set_card(null);
        }
        this.emit(this.event.on_filter_changed);
    }

    set_card(value)
    {
        this.state.sel_card = value;
        this.emit(this.event.on_card_changed);
        this.define_other_params();
        this.apply_card_filter();
    }

    define_other_params()
    {
        if(this.state.sel_card == null)
        {
            this.set_design(null);
            this.set_currency(null);
            this.set_action(null);
            this.set_segment(null);
            this.set_param(null);
            return;
        }
        let design_set = new Set();
        let currency_set = new Set();
        let action_set = new Set();
        let param_set = new Set();
        let segment_set = new Set();

        this.state.products.forEach((i)=>
        {
            // tariff
            if(
                this.state.sel_tariff_plan == i.tariff_plan
                && this.state.sel_tariff == i.tariff
                && this.state.sel_card == i.card)
            {
                if(i.design != "" && i.design != null && ! design_set.has(i.design))
                    design_set.add(i.design);

                if(i.currency != "" && i.currency != null && ! currency_set.has(i.currency))
                    currency_set.add(i.currency);

                if(i.action != "" && i.action != null && ! action_set.has(i.action))
                    action_set.add(i.action);

                if(i.param != "" && i.param != null && ! param_set.has(i.param))
                    param_set.add(i.param);

                if(i.segment != "" && i.segment != null && ! segment_set.has(i.segment))
                    segment_set.add(i.segment);
            }
        });
        this.state.designs.length = 0;
        design_set.forEach((v)=>
        {
            this.state.designs.push(v);
        });
        this.state.currencies.length = 0;
        currency_set.forEach((v)=>
        {
            this.state.currencies.push(v);
        });
        this.state.actions.length = 0;
        action_set.forEach((v)=>
        {
            this.state.actions.push(v);
        });

        this.state.params.length = 0;
        param_set.forEach((v)=>
        {
            this.state.params.push(v);
        });

        this.state.segments.length = 0;
        segment_set.forEach((v)=>
        {
            this.state.segments.push(v);
        });

        if(this.state.sel_design != null && ! design_set.has(this.state.sel_design))
            this.set_design(null);
        if(this.state.sel_currency != null && ! currency_set.has(this.state.sel_currency))
            this.set_currency(null);
        if(this.state.sel_action != null && ! action_set.has(this.state.sel_action))
            this.set_action(null);
        if(this.state.sel_param != null && ! param_set.has(this.state.sel_param))
            this.set_param(null);
        if(this.state.sel_segment != null && ! segment_set.has(this.state.sel_segment))
            this.set_segment(null);

        this.emit(this.event.on_filter_changed);
    }


    set_currency(value)
    {
        this.state.sel_currency = value;
        this.emit(this.event.on_currency_changed);
        this.apply_card_filter();
    }

    set_action(value)
    {
        this.state.sel_action = value;
        this.emit(this.event.on_action_changed);
        this.apply_card_filter();
    }
    set_param(value)
    {
        this.state.sel_param = value;
        this.emit(this.event.on_param_changed);
        this.apply_card_filter();
    }
    set_design(value)
    {
        this.state.sel_design = value;
        this.emit(this.event.on_design_changed);
        this.apply_card_filter();
    }
    set_segment(value)
    {
        this.state.sel_segment = value;
        this.emit(this.event.on_segment_changed);
        this.apply_card_filter();
    }
    set_product(product)
    {
        this.state.sel_product = product;
        this.emit(this.event.on_product_changed)
    }
    set_is_active(value)
    {
        this.state.is_active = value;
        this.emit(this.event.on_is_active_changed);
        if(this.state.sel_type == 26 || this.state.sel_type == 23)
        {
            this.apply_card_filter();
        }
        else if(this.state.sel_type == 13)
        {
            this.define_cash_product();
        }

    }
}
export default new product_store();
 