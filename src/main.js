// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'

// 设置反向代理，前端请求默认发送到 http://localhost:8080/api
axios.defaults.baseURL = 'http://localhost:8080/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(axios, VueAxios)

const store = new Vuex.Store(
  {
    state: {
      isLogin: false,
      curuser: '',
      cursid: -1
    },
    mutations: {
      login(state, username) {
        state.isLogin = true
        state.curuser = username
      },
      logout(state) {
        state.isLogin = false
        state.curuser = ''
      }
    }
  }
)

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
