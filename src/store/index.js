import { createStore } from 'vuex'

export default createStore({
  state: {
    menu_is_active: false,
  },
  mutations: {
    TOGGLE_MENU: (state) => {
      state.menu_is_active = !state.menu_is_active
    }
  },
  actions: {
    toggleMenu ({ commit }) {
      commit('TOGGLE_MENU')
    }
  }
})
