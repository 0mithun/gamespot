import Vue from 'vue'
import  VueRouter from 'vue-router'
Vue.use(VueRouter)

import  Home from './components/home/Index'
import SignIn from './components/signin/index'
const routes =[
    {path:'/', component:Home, name:'home'},
    {path:'/signin', component:SignIn, name:'signin'},
]

const router = new VueRouter({
    mode:'history',
    routes,
    scrollBehavior(from, to, savedPosition){
        return{x:0, y:0}
    }
})

export default  router
