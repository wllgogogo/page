import Vue from 'vue'
import router from './router'
import App from './App.vue'
import globalComponents from './common'
import iView from 'view-design'
import './my-theme/index.less'
Vue.use(iView)
Vue.config.productionTip = false
Vue.use(globalComponents)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
