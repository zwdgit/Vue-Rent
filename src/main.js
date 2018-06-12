import Vue from 'vue'
import Router from 'vue-router'
import store from './vuex'
import App from './App'
import routes from './router'
import axios from 'axios'
import ImgLazyLoad from 'vue-lazyload'
import MuseUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import Toast from './components/Toast.js'
import './components/Toast.css'

Vue.use(Toast)
Vue.use(Router)
Vue.use(MuseUi)
Vue.config.productionTip = false

window.axios = axios;

Vue.use(ImgLazyLoad, {
  loading: 'http://localhost:8080/static/timg.gif',
  })
axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5ac1881d19f9911d167ac7b3/rent';
axios.defaults.withCredentials = true;
const router = new Router({
  mode: 'history',
  routes,
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  template: '<App/>',
  components: { App }
})
