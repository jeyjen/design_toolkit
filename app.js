import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './style/common.css';
import './style/style.css';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './component/main';
import cs from './store/common';
//import Init from './component/init';
//import Auth from './component/auth';

const App = () => (
    <MuiThemeProvider>
        <Main/>
    </MuiThemeProvider>
);
export default App;

