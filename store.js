import { createStore } from 'redux';
import reducer from './reducer/main';
let store = createStore(reducer);
export default store;