/**
 * Created by eugene on 09.05.2017.
 */
import shop from '../../api/shop'
import * as types from '../../name'

// initial state
const state = {
    all: []
}

// getters
const getters = {
    allProducts: state => state.all
}

// actions
const actions = {
    getAllProducts ({ commit }) {
        shop.getProducts(products => {
            commit(types.RECEIVE_PRODUCTS, { products })
        })
    }
}

// mutations
const mutations = {
    // [types.RECEIVE_PRODUCTS] (state, { products }) {
    //     state.all = products
    // },
    //
    // [types.ADD_TO_CART] (state, { id }) {
    //     state.all.find(p => p.id === id).inventory--
    // },
    // [types.COMMON_OPERATION] (state, data){
    //     console.log('product mutation');
    //     console.log(data);
    // }
}

export default {
    state,
    getters,
    actions,
    mutations
}