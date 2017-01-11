import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';

class flex extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        let style = assign({display:'flex'}, this.props);
        delete style.children;
        return (
            <section style={style}>
                {this.props.children}
            </section>
        );
    }
}

export default flex;