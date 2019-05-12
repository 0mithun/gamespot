import Vue from 'vue'

const posts = {
    namespaced: true,
    state:{
        homePost: null
    },
    getters:{
        getAllPosts(state){
            return state.homePost
        }
    },
    mutations:{
        getAllPosts(state, payload){
            state.homePost = payload
        }
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
        }
    }
}

export  default posts