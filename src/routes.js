import Vue from 'vue'
import  VueRouter from 'vue-router'
Vue.use(VueRouter)

import store from './store/store'

import  Home from './components/home/Index'
import SignIn from './components/signin/index'

import Dashboard from './components/dashboard/index'
import MainDashboard from './components/dashboard/MainDashboard'
import AddPost from './components/dashboard/AddPost'
import  ListPost from './components/dashboard/ListPost'
import Post from './components/post/post'
import NotFound from './components/404/Index'

const authGuard ={
    beforeEnter(to, from, next){
        const redirect = ()=>{
            if(store.state.admin.token){
                if(to.path === '/signin'){
                    next('/dashboard')
                }else{
                    next()
                }
            }else {
                if(to.path === '/signin'){
                    next()
                }else{
                    next('/')
                }
            }
        }
        if(store.state.admin.refreshLoading){
            store.watch((state, getters)=>{ getters['admin/refreshLoading'] }, ()=>{
                redirect()
            })
        }else{
            redirect()
        }
    }
}

const routes =[
    {path:'/', component:Home, name:'home'},
    {path:'/signin', component:SignIn, name:'signin', ...authGuard},
    {path:'/dashboard', component:Dashboard, name:'dashboard', children:[
            {path:'/', component:MainDashboard},
            {path:'add-post', component:AddPost},
            {path:'list-post', component:ListPost},
        ],
        ...authGuard,
    },
    {path:'/post/:id', component:Post},
    {path:'*', component:NotFound}
]

const router = new VueRouter({
    mode:'history',
    routes,
    scrollBehavior(from, to, savedPosition){
        return{x:0, y:0}
    }
})

export default  router
