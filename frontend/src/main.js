import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax)
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import './assets/styles.scss'

Vue.config.productionTip = false

import axios from 'axios'
const token = store.state.Auth.access_token
const baseURL = "http://127.0.0.1:8000/"

axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.Auth.access_token) {
            next('/Login')
        } else {
            next()
        }
    } else {
        next() 
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
