import React from 'react';

import component from '../engine/component';
import sizeMe from 'react-sizeme';
import { Scrollbars } from 'react-custom-scrollbars';

class navi_item extends component {
    render() {
        const { width, height } = this.props.size;
        return (
            <div style={{height:'100%', width:'100%', position:'absolute', top:-20}}>
                <Scrollbars
                    autoHide
                    style={{width: width, height:height - 64, position:'absolute', top:85}}
                >
                    {this.props.children}
                </Scrollbars>
           </div>
        );
    }
}

const SizedNaviItem = sizeMe({ monitorHeight: true })(navi_item);;
class Wrapper extends component {
    render() {
        return (
            <SizedNaviItem {...this.props}>
                {this.props.children}
            </SizedNaviItem>
        );
    }
}

export default Wrapper;