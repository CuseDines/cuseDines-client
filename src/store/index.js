import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sideBarOpen: false,
        user: {}
    },
    getters: {
        sideBarOpen: state => {
            return state.sideBarOpen
        },
        getCurrentUser: state => state.user,
        getCurrentUserId: state => state.user.uid
    },
    mutations: {
        toggleSidebar (state) {
            state.sideBarOpen = !state.sideBarOpen
        },
        setCurrentUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        toggleSidebar(context) {
            context.commit('toggleSidebar')
        },
        setCurrentUser(context, payload) {
            context.commit('setCurrentUser', payload)
        } 
    }
})
