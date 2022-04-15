import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
    isError: false,
    errorMessage: ''
  },
  mutations: {
    setIsAuth(state, value) {
      state.isAuth = value;
    },
    setIsError(state, value) {
      state.isError = value;
    },
    setErrorMessage(state, value) {
      state.errorMessage = value;
    }
  },
  actions: {
    setIsAuth({ commit }, value) {
      commit('setIsAuth', value);
    },
    triggerError({ commit }, message) {
      commit('setErrorMessage', message);
      commit('setIsError', true);
      setTimeout(() => {
        commit('setIsError', false);
      }, 5000);
    }
  },
  getters: {
    isAuth: state => state.isAuth,
    isError: state => state.isError,
    errorMessage: state => state.errorMessage
  }
})
