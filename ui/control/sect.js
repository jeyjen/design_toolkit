import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';

class sect extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section style={this.props}>
                {this.props.children}
            </section>
        );
    }
}
export default sect;