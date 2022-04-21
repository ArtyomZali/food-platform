import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({ basket: state.basket })
})

export default new Vuex.Store({
  state: {
    isAuth: false,
    isError: false,
    errorMessage: '',
    isLoading: false,
    basket: []
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
    },
    addSellerToBasket(state, value) {
      if (!state.basket.find(seller => seller.id === value.id)) {
        state.basket.push({ ...value, shopItems: [] });
      }
    },
    addShopItemToBasket(state, value) {
      const seller = state.basket.find(seller => seller.id === value.ownerId);
      if (!seller.shopItems.find(item => item.id === value.id)) {
        seller.shopItems.push({ ...value, count: 1 });
      }
      const basket = [...state.basket];
      state.basket = [];
      state.basket = basket;
    },
    removeShopItemFromBasket(state, value) {
      const seller = state.basket.find(seller => {
        return seller.shopItems.find(item => item.id === value.id);
      });
      seller.shopItems.splice(seller.shopItems.findIndex(item => item.id === value.id), 1);
      if (!seller.shopItems.length) {
        state.basket.splice(state.basket.findIndex(sel => sel.id === seller.id), 1);
      }
      const basket = [...state.basket];
      state.basket = [];
      state.basket = basket;
    },
    removeSellerFromBasket(state, value) {
      state.basket.splice(state.basket.findIndex(seller => seller.id === value.id), 1);
    },
    changeShopItemCount(state, value) {
      const seller = state.basket.find(seller => {
        return seller.shopItems.find(item => item.id === value.id);
      });
      seller.shopItems[seller.shopItems.findIndex(item => item.id === value.id)] = value;
      const basket = [...state.basket];
      state.basket = [];
      state.basket = basket;
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
    },
    async addShopItemToBasket({ commit }, { sellerProfile, shopItem }) {
      await commit('addSellerToBasket', sellerProfile);
      commit('addShopItemToBasket', shopItem);
    },
    changeShopItemCount({ commit }, shopItem) {
      commit('changeShopItemCount', shopItem);
    },
    removeShopItemFromBasket({ commit }, item) {
      commit('removeShopItemFromBasket', item);
    },
    removeSellerFromBasket({ commit }, seller) {
      commit('removeSellerFromBasket', seller);
    }
  },
  getters: {
    isAuth: state => state.isAuth,
    isError: state => state.isError,
    errorMessage: state => state.errorMessage,
    isLoading: state => state.isLoading,
    basket: state => state.basket
  },
  plugins: [vuexLocal.plugin]
})
