import component from '../engine/component';
import Viewport from '../control/viewport';
import Sect from '../control/sect';
import Flex from '../control/flex';
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
    render_template(View)
    {
        return(
            <Flex flexDirection="column" height="100%">
                <Sidebar/>
                <Toolbar/>
                <View style={{backgroundColor:'#7563c6', flexGrow:1, width:'100%'}}/>
            </Flex>
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
                view = this.render_template(Dia);
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


/*
 <Viewport>
 {view}
 </Viewport>
* */