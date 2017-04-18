import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import component from '../engine/component';
import Icon from './icon';
import Dia from '../app/dia/dia';

injectTapEventPlugin();
class main extends component {
    constructor(props) {
        super(props);
        this.state =
        {}
    }

    componentDidMount() {}

    componentWillUnmount() {}
    render() {
        return (
            <section>
                <Icon/>
                <Dia/>
            </section>
        );
    }

}
export default main;