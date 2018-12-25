// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import store from './store'
import router from './router';

Vue.prototype.$ajax = axios;

Vue.config.productionTip = false;
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://127.0.0.1:8000';
  axios.defaults.headers.common.Authorization = 'Bearer bGl1cmVubGluNzdAZ21haWwuY29tOmwxMjM0NTY==';
  // eslint-disable-next-line
  console.log(window);
  window.Laravel = { api_token: 'bGl1cmVubGluNzdAZ21haWwuY29tOmwxMjM0NTY==' };
} else {
  axios.defaults.baseURL = 'https://cndwine-mall.winhm.com';
  axios.defaults.headers.common.Authorization = 'Bearer ' + window.Laravel.api_token;
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
