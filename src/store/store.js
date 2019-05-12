import  Vue from 'vue'
import  Vuex from 'vuex'
Vue.use(Vuex)

import admin from './modules/admin'
import posts from './modules/posts'


const store = new Vuex.Store({
    modules:{
        admin,
        posts
    },
    state:{

    },
    getters:{

    },
    mutations:{

    },
    actions:{

    }
})

export default store

