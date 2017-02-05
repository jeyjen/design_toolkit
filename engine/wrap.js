import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function wrap(Component: Component) {
    class Wrapper extends React.Component {
        render () {
            return (
                <MuiThemeProvider muiTheme = {getMuiTheme()}>
                    <Component {...this.props}/>
                </MuiThemeProvider>
            )
        }
    }
    return Wrapper
}



//
