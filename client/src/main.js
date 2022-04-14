import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import apiPlugin from './plugins/api';
import errorHandlerPlugin from './plugins/errorHandler';

Vue.use(errorHandlerPlugin);
Vue.use(apiPlugin);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
