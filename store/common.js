import store from '../engine/store';


const default_layouts =
{
    lg:
    [
        {i: 'dia', x: 0, y: 0, w: 16, h: 2},
        {i: 'detail', x: 16, y: 0, w: 4, h: 4}
    ],
    md:
    [
        {i: 'dia', x: 0, y: 0, w: 16, h: 2},
        {i: 'detail', x: 16, y: 0, w: 4, h: 4}
    ],
    sm:
    [
        {i: 'dia', x: 0, y: 0, w: 16, h: 2},
        {i: 'detail', x: 16, y: 0, w: 4, h: 4}
    ],
    xs:
    [
        {i: 'dia', x: 0, y: 0, w: 16, h: 2},
        {i: 'detail', x: 16, y: 0, w: 4, h: 4}
    ],
    xxs:
    [
        {i: 'dia', x: 0, y: 0, w: 16, h: 2},
        {i: 'detail', x: 16, y: 0, w: 4, h: 4}
    ]
}

class common extends store
{
    constructor()
    {
        super();
        this._breakpoints = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0};
        this._row_height = 40;
        this._cols = {lg: 20, md: 20, sm: 20, xs: 20, xxs: 20};
        this._margin = [15, 15];
        this._sel_form = null;
        this._layouts = this.get_from_ls('layouts');

        //this.remove_from_ls('layouts');
        if(this._layouts === null)
        {
            this._layouts = default_layouts;
            this.set_to_ls('layouts', default_layouts);
        }

        this.e =
        {
            on_main_window_changed:'on_main_window_changed',
            on_sel_form_changed: 'on_sel_form_changed'
        }
    }
    select_form(form)
    {
        this._sel_form = form;
        this.emit(this.e.on_sel_form_changed);
    }

    update_layouts(layout, layouts)
    {
        this._layouts = layouts;
        this.set_to_ls('layouts', layouts);
    }
    
    onLayoutChange(layout, layouts) {
        saveToLS('layouts', layouts);
        this.setState({layouts});
        this.props.onLayoutChange(layout, layouts);
    }
    //onLayoutChange={this.onLayoutChange}>

    get_from_ls(key)
    {
        if (global.localStorage)
        {
            let value = global.localStorage.getItem(key);
            if(value !== null)
            {
                return JSON.parse(value);
            }
            return value;
        }
    }

    set_to_ls(key, value)
    {
        if(global.localStorage)
        {
            global.localStorage.setItem(key, JSON.stringify(value));
        }
    }

    remove_from_ls(key)
    {
        if(global.localStorage)
        {
            global.localStorage.removeItem(key);
        }
    }

}
export default new common();
 