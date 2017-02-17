//import 'jquery-ui/themes/base/core.css';
//import 'jquery-ui/themes/base/all.css';
//import 'bootstrap/dist/css/bootstrap.css';
//import ReactDOM from 'react-dom';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './style/common.css';
import './style/style.css';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navigator from './component/navigator';

const App = () => (
    <MuiThemeProvider>
        <Navigator/>
    </MuiThemeProvider>
);
export default App;

