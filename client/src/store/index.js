import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
    isError: false,
    errorMessage: '',
    isLoading: false
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
    },
    setIsLoading(state, value) {
      state.isLoading = value;
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
    },
    setIsLoading({ commit }, value) {
      if (value) {
        commit('setIsLoading', value);
      } else {
        setTimeout(() => {
          commit('setIsLoading', value);
        }, 500);
      }
    }
  },
  getters: {
    isAuth: state => state.isAuth,
    isError: state => state.isError,
    errorMessage: state => state.errorMessage,
    isLoading: state => state.isLoading
  }
})
