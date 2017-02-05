import React from 'react';

class component extends React.Component {

    constructor(props) {
        super(props);

        this._listeners = {};
        this.upd = this.upd.bind(this);
    }

    on(emmiter, event, listener)
    {
        if(listener == null)
        {
            emmiter.on(event, this.upd);
        }
        else
        {
            let l = ()=>
            {
                listener();
                this.upd();
            }

            this._listeners[event] = l;
            emmiter.on(event, l);
        }
    }

    upd()
    {
        this.setState(this.state);
    }

    off(emmiter, event)
    {
        if(this._listeners.hasOwnProperty(event))
        {
            emmiter.off(event, this._listeners[event])
            delete this._listeners[event];
        }
        else
        {
            emmiter.off(event, this.upd);
        }
    }
}

export default component;