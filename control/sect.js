import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';

class sect extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let style = assign({}, this.props);
        delete style.children;

        return (
            <section style={style}>
                {this.props.children}
            </section>
        );
    }
}
export default sect;