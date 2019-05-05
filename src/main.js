import Vue from 'vue'
import App from './App.vue'
import  router from './routes'
import VueMaterial from 'vue-material'
import VueResource from 'vue-resource'
import store from './store/store'
import Button from './components/UI/button.vue'
import Vuelidate from 'vuelidate'



Vue.use(VueMaterial)
Vue.use(VueResource)
Vue.use(Vuelidate)

Vue.http.options.root = ''


// import {MdCard} from 'vue-material/dist/components'
//
/*1
* Vue Material
* */

// Vue.use(MdCard)




Vue.component('app-button',Button)
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
