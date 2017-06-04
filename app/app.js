import Vue from 'vue'
import app from './components/app.vue'
import store from './store'
import {m, a} from './name';
import data from './data';

new Vue({
  el: '#app',
  store,
  render: h => h(app)
})
store.commit(m.project.put, data);
