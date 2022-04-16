import Cookies from 'js-cookie';
import assets from './assets';
import auth from './auth';
import sellers from './sellers';
import shopItems from './shopItems';
import user from './user';
import purchases from './purchases';
import reviews from './reviews';
import chats from './chats';

const api = {
  BASE_URL: process.env.VUE_APP_BASE_URL,

  getAuthToken() {
    return ` Bearer ${Cookies.get('jwt_a')}`;
  },

  getRefreshToken() {
    return `Bearer ${Cookies.get('jwt_r')}`;
  },

  removeTokens() {
    Cookies.remove('jwt_a');
    Cookies.remove('jwt_r');
  },

  setTokens(tokens) {
    Cookies.set('jwt_a', tokens.access);
    if (tokens.refresh)
      Cookies.set('jwt_r', tokens.refresh);
  },

  getFormDataFromObject(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => {
      formData.append(key, object[key]);
    });
    return formData;
  },

  ...auth,
  ...assets,
  ...sellers,
  ...shopItems,
  ...user,
  ...purchases,
  ...reviews,
  ...chats
};

const plugin = {
  install(Vue, options) {
    Vue.prototype.$api = api;
  }
}

export default plugin;