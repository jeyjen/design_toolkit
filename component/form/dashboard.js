import React from 'react';
import component from '../../engine/component';
//import product_store from '../store/product_store'

class dashboard extends component {
    constructor(props) {
        super(props);
        this.state =
        {
            number: 0 //product_store.get_state().number
        }
    }
    componentDidMount()
    {
        //let state = this.state;
        //
        //let pc = product_store.c;
        //this.subscribe(product_store, pc.tick, ()=>
        //{
        //     state.number = product_store.get_state().number;
        //    this.setState(state);
        //});
    }

    componentWillUnmount()
    {
        //this.unsubscribe(product_store, pc.tick);
    }

    render() {
        return (
            <h1>тик: {this.state.number}</h1>
        );
    }
}



export default dashboard;