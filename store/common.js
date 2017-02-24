import store from '../engine/store';
import uuid from 'uuid';


const default_layouts =
{
    lg:
    [
        {i: 'hierarchy', x: 0, y: 0, w: 4, h: 6},
        {i: 'dia', x: 4, y: 0, w: 12, h: 7},
        {i: 'detail', x: 16, y: 0, w: 4, h: 5}
    ],
    md:
    [
        {i: 'hierarchy', x: 0, y: 0, w: 4, h: 6},
        {i: 'dia', x: 0, y: 0, w: 16, h: 2},
        {i: 'detail', x: 16, y: 0, w: 4, h: 4}
    ],
    sm:
    [
        {i: 'hierarchy', x: 0, y: 0, w: 4, h: 6},
        {i: 'dia', x: 0, y: 0, w: 16, h: 2},
        {i: 'detail', x: 16, y: 0, w: 4, h: 4}
    ],
    xs:
    [
        {i: 'hierarchy', x: 0, y: 0, w: 4, h: 6},
        {i: 'dia', x: 0, y: 0, w: 16, h: 2},
        {i: 'detail', x: 16, y: 0, w: 4, h: 4}
    ],
    xxs:
    [
        {i: 'hierarchy', x: 0, y: 0, w: 4, h: 6},
        {i: 'dia', x: 0, y: 0, w: 16, h: 2},
        {i: 'detail', x: 16, y: 0, w: 4, h: 4}
    ]
}

let def_views = ['dia', 'detail', 'hierarchy'];

class common extends store
{
    constructor()
    {
        super();
        this.e =
        {
            on_main_window_changed:'on_main_window_changed',
            on_new_view_added:'on_view_added',
            on_sel_form_changed: 'on_sel_form_changed'
        }

        this._titles = new Map();
        this._breakpoints = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0};
        this._row_height = 40;
        this._cols = {lg: 20, md: 20, sm: 20, xs: 20, xxs: 20};
        this._margin = [15, 15];
        this._sel_form = null;
        this._layouts = this.get_from_ls('layouts');
        this._views = new Set();

        this._titles.set('dia', 'процесс');
        this._titles.set('detail', 'узел');
        this._titles.set('hierarchy', 'родители');
        
        //this.remove_from_ls('layouts');
        if(this._layouts === null)
        {
            this._layouts = default_layouts;
            this.set_to_ls('layouts', default_layouts);
        }

        this._layouts.lg.forEach((i)=>
        {
            this.add_view(i.i);
        });

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

    add_view(type)
    {
        this._views.add(type);
        this.emit(this.e.on_new_view_added);
    }

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
 