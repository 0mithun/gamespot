import Vue from 'vue'

const posts = {
    namespaced: true,
    state:{
        homePost: null,
        post:null,
    },
    getters:{
        getAllPosts(state){
            return state.homePost
        },
        getPost(state){
            return state.post
        },

    },
    mutations:{
        getAllPosts(state, payload){
            state.homePost = payload
        },
        getPost(state, post){
            state.post = post
        },
        clearPost(state) {
            state.post = null
        },

    },
    actions:{
        getAllPosts({commit}, payload){
            Vue.http.get(`posts.json?orderBy="$key"&limitToLast=${payload.limit}`)
                .then(res=>res.json())
                .then(data=>{
                    const posts = []
                    for(let key in data){
                        posts.push({
                            ...data[key],
                            id: key
                        })
                    }
                    commit('getAllPosts', posts.reverse())
                })
                .catch(err=>console.log(err))
        },
        getPost({commit}, id){
            Vue.http.get(`posts.json?orderBy="$key"&equalTo="${id}"`)
                .then(res=>res.json())
                .then(data=>{
                    let post = {}
                    for(let key in data){
                        post = {
                            ...data[key],
                            id:key
                        }
                    }
                    commit('getPost', post)
                })
                .catch(err=>console.log(err))
        },

    }
}

export  default posts