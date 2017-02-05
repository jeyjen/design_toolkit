import React from 'react';
class viewport extends React.Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            overflowY: props.overflowY||"auto",
            overflowX: props.overflowX||"hidden"
        }
        this.set_size();
        this.update_size = this.update_size.bind(this);
        window.onresize = this.update_size;
    }
    render()
    {
        let s =
        {
            width:'100%',
            height:this.state.height,
            overflowY:this.state.overflowY,
            overflowX:this.state.overflowX,
            display: 'flex',
            flexDirection: 'column'
        }
        return(
            <section style={s}>
                {this.props.children}
            </section>
        );
    }
    set_size()
    {
        if (typeof window.innerWidth != 'undefined')
        {
            this.state.height = window.innerHeight;
        }
        else if (
            typeof document.documentElement != 'undefined'
            && typeof document.documentElement.clientWidth !=
            'undefined' && document.documentElement.clientWidth != 0)
        {
            this.state.height = document.documentElement.clientHeight
        }
        else
        {
            this.state.height = document.getElementsByTagName('body')[0].clientHeight
        }

        this.state.height = this.state.height - 1;
    }

    update_size()
    {
        this.set_size();
        this.setState(this.state);
    }
}
export default viewport;
