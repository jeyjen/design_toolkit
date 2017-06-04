/**
 * Created by eugene on 09.05.2017.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import cart from './module/cart'
import products from './module/product'
import dia from './module/dia';
import {m, a} from '../name';

Vue.use(Vuex)

// getters
const getters = {
    count2(state){
        return state.items.length;
    }
}
// actions
const actions = {
    [a.project.load]({commit, state}, arg1){
    }
}

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    actions,
    getters,
    modules: {
        cart,
        products,
        dia
    },
    strict: debug
})