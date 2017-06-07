import Vue from 'vue'
import app from './app'
import store from './store'
import {m, a} from './name'
import data from './data'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store: store,
  template: '<app/>',
  components: { app }
})
store.commit(m.project.put, data)
