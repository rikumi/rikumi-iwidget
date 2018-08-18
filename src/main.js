import Vue from 'vue'
import App from './App'
import Persist from 'vue-component-persist'

Vue.config.productionTip = false
Vue.use(Persist)

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})