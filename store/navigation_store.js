import EventEmitter from 'event-emitter-es6';

class navigation_store extends EventEmitter
{
    constructor()
    {
        super();

        this.event =
        {
            on_view_changed: 'on_view_changed',
            on_sidebar_state_changed: 'on_sidebar_state_changed'
        }
        
        this.view = 'init';
        this.is_sidebar_open = false;
    }

    set_view(view)
    {
        this.view = view;
        this.emit(this.event.on_view_changed);
    }
    
    sidebar_open()
    {
        this.is_sidebar_open = true;
        this.emit(this.event.on_sidebar_state_changed);
        console.log(this.event.on_sidebar_state_changed);
    }
    sidebar_close()
    {
        this.is_sidebar_open = false;
        this.emit(this.event.on_sidebar_state_changed);
        console.log(this.event.on_sidebar_state_changed);
    }

}
export default new navigation_store();
 