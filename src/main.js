import Vue from 'vue';
import VueMeta from 'vue-meta';
import axios from 'axios';
import App from './App.vue';
import router from './router/index.js';
import store from './store';

import '@/assets/css/global.css';

Vue.use(VueMeta);
Vue.config.productionTip = false;

// ------------------- AXIOS SETUP ------------------- //
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

// Attach auth token if available
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['x-auth-token'] = token;
}

// ------------------- VUE INSTANCE ------------------- //
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
