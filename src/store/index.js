import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action'
import { setStore,getStore,removeStore } from '../config/storage'
Vue.use(Vuex)

const state = {
    username:'',
    addRouters:[],
    role:''
}

const mutations = {
    SET_ROUTES: (state, routers) => {
        console.log('mei',routers)
        state.addRouters = []
        state.addRouters = routers.routs
        state.role = routers.roleName.name
        setStore('roleName',routers.roleName)
        setStore('addRouters',routers.routs)
    },
    LOGOUT: (state) => {
        state.addRouters = []
        removeStore('username')
        removeStore('addRouters')
        removeStore('roleName')
        removeStore('keyCode')
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store