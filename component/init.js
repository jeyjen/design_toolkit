import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Sect from '../control/sect';
import component from '../engine/component';

class toolbar extends component {

    constructor(props) {
        super(props);
        this.state =
        {};
    }
    componentDidMount()
    {}
    componentWillUnmount()
    {}
    render() {
        return (
            <Sect
            paddingTop="150px"
            >
                <h1 style={{textAlign: 'center'}}>идет подготовка</h1>
                <Sect
                    margin="auto"
                    width={80}
                >
                    <CircularProgress size={80} thickness={3} />
                </Sect>
            </Sect>
        );
    }
}
export default toolbar;