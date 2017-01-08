import component from '../engine/component';
import Viewport from '../control/viewport';
import Sect from '../control/sect';
import Toolbar from './toolbar';
import Sidebar from './sidebar';
import Init from './init';
import injectTapEventPlugin from 'react-tap-event-plugin';

import ns from '../store/navigation_store';
import Dia from './form/dia';

injectTapEventPlugin();

class navigator extends component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    componentDidMount() {
        this.on(ns, ns.event.on_view_changed);
    }

    componentWillUnmount() {
        this.off(ns, ns.event.on_view_changed);
    }
    render_template(view)
    {
        return(
            <Sect>
                <Sidebar/>
                <Toolbar/>
                <Sect
                flexGrow="1">
                    {view}
                </Sect>
            </Sect>
        )
    }

    render() {

        let view = null;
        switch (ns.view)
        {
            case 'init':
            {
                view = <Init/>;
            }break;
            case 'dia':
            {
                view = this.render_template(<Dia/>);
            }break;
        }
        return (
            <Viewport>
                {view}
            </Viewport>
        );
    }
}
export default navigator;
