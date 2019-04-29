import Vue from 'vue'
import App from './App.vue'
import  router from './routes'

import Button from './components/UI/button.vue'

Vue.component('app-button',Button)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
