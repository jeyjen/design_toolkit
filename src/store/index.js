import Vue from 'vue'
import Vuex from 'vuex'
import dia from './module/dia'
import name from '../name'

Vue.use(Vuex)

const state = {
  is_connected: false
}
const getters = {
    //count2(state){
    //    return state.items.length;
    //}
}
const actions = {
  [name.app.start](store){},
  [name.app.stop](store){},
}
const mutations = {
  [name.connection._open](state){
    state.is_connected = true;
  },
  [name.connection._close](state){
    state.is_connected = false;
  }
}

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules: {
        dia
    },
    strict: debug
})
