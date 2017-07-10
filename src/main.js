import Vue from 'vue'
import app from './app'
import store from './store'
import data from './data'
import emit from './emit'

window.onbeforeunload = ()=>{
  emit.app.stop();
}
emit.app.start();

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store: store,
  template: '<app/>',
  components: { app }
})
emit.project._put(data);
//store.commit(m.project.put, data)
