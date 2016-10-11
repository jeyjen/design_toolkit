import React from 'react';
import ReactDOM from 'react-dom';

class flexbox extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        let style = Object.assign({display:'flex'}, this.props);
        return (
            <section style={style}>
                {this.props.children}
            </section>
        );
    }
}
export default flexbox;