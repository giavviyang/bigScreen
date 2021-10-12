import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/reset.less'
import './assets/media.less'
//引入api
import api from './api/index'
Vue.prototype.$api = api
import iconfont from './assets/iconfont/iconfont.css';



Vue.config.productionTip = false
Vue.use(Element);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
