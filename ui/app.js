//import 'jquery-ui/themes/base/core.css';
//import 'jquery-ui/themes/base/all.css';
//import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import './style/common.css';
import './style/style.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navigator from './component/navigator';

import tp from './provider/toolkit_provider';
import ns from './store/navigation_store';

const App = () => (
    <MuiThemeProvider>
        <Navigator/>
    </MuiThemeProvider>
);
ReactDOM.render(<App/>, document.getElementById("content"));

ns.set_view("dia");

// tp.start()
//     .then((r)=>
//     {
//         ns.set_view("dia");
//     })
//     .catch((e)=>
//     {
//         alert('возникла ошибка: ' + e);
//     })


export default "";

