import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import { setStore,getStore,removeStore } from '../config/storage'
Vue.use(Vuex)

const state = {
    username:'',
    routers:[],
    addRouters:[]
}

const mutations = {
    SET_ROUTES: (state, routers) => {
        state.addRouters = routers
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store