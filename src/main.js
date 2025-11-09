import Vue from 'vue';
import VueMeta from 'vue-meta';
import axios from 'axios';
import { io } from 'socket.io-client';
import App from './App.vue';
import router from './router/index.js';
import store from './store';

import '@/assets/css/global.css';

Vue.use(VueMeta);
Vue.config.productionTip = false;

// ------------------- AXIOS SETUP ------------------- //
// Use environment variable for backend URL
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

// Attach auth token if available
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['x-auth-token'] = token;
}

// ------------------- SOCKET.IO SETUP ------------------- //
// Use environment variable for WebSocket URL
const socket = io(process.env.VUE_APP_SOCKET_URL, {
  path: '/socket.io',           // Make sure backend serves WS at this path
  transports: ['websocket'],    // Force WebSocket transport
  autoConnect: true
});

// Connection events
socket.on('connect', () => {
  console.log('Connected to backend via WebSocket, socket id:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected from backend:', reason);
});

socket.on('connect_error', (err) => {
  console.error('WebSocket connection error:', err.message);
});

// Make socket available globally in Vue components
Vue.prototype.$socket = socket;

// ------------------- VUE INSTANCE ------------------- //
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
