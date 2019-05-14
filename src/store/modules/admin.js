import Vue from 'vue'
import router from '../../routes'

const FBaseAuth = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const FBaseApiKey = 'AIzaSyBscQAl1nPwOAip20Kiin9q4TKYpm0eyy4'
const admin = {
    namespaced: true,
    state: {
        token: null,
        refresh: null,
        authFailed: false,
        refreshLoading:true,
        addPost:false,
        imageUpload: null,
        adminPosts: null

    },
    getters: {
        isAuth(state) {
            if (state.token) {
                return true
            }
            return false
        },
        refreshLoading(state) {
            return state.refreshLoading
        },
        addPostStatus(state){
            return state.addPost
        },
        imageUploadStatus(state){
            return state.imageUpload
        },
        getAdminPosts(state){
            return state.adminPosts
        }
    },
    mutations: {
        authUser(state, authData) {
            state.token = authData.idToken
            state.refresh = authData.refreshToken
            if (authData.type === 'signin') {
                router.push('/dashboard')
            }
        },
        authFailed(state, type) {
            if (type === 'reset') {
                state.authFailed = false
            } else {
                state.authFailed = true
            }
        },
        logout(state) {
            state.token = null
            state.refresh = null
            localStorage.removeItem('token')
            localStorage.removeItem('refresh')
            router.push('/')
        },
        refreshLoading(state){
            state.refreshLoading = false
        },
        addPost(state) {
            state.addPost = true
            setTimeout(()=>{
                state.addPost = false
            },5000)
        },
        imageUpload(state, imageData){
            state.imageUpload = imageData.secure_url
        },
        clearImageUpload(state){
            state.imageUpload = null
        },
        getAdminPosts(state, adminPosts){
            state.adminPosts = adminPosts
        }
    },
    actions: {
        signIn({commit}, payload) {
            Vue.http.post(`${FBaseAuth}/verifyPassword?key=${FBaseApiKey}`, {
                returnSecureToken: true,
                ...payload
            })
                .then(res => res.json())
                .then(authData => {
                    commit('authUser', {
                        ...authData,
                        type: 'signin'
                    })
                    localStorage.setItem('token', authData.idToken)
                    localStorage.setItem('refresh', authData.refreshToken)
                })
                .catch(err => {
                    commit('authFailed', '')
                })
        },
        refreshToken({commit}) {
            let refreshToken = localStorage.getItem('refresh')
            if(refreshToken){
                Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${FBaseApiKey}`,{
                    grant_type: 'refresh_token',
                    refresh_token:refreshToken
                })
                    .then(res=>res.json())
                    .then(authData=>{
                        commit('authUser',{
                            idToken:authData.id_token,
                            refreshToken:authData.refresh_token,
                            type:'refresh'
                        })
                        localStorage.setItem('token', authData.id_token)
                        localStorage.setItem('refresh', authData.refresh_token)
                        commit('refreshLoading')
                    })
                    .catch(err=>console.log(err))
            }else{
                commit('refreshLoading')
            }
        },
        addPost({commit, state}, formData) {
            Vue.http.post(`posts.json?auth=${state.token}`, formData)
                .then(res=>res.json())
                .then(data=>{
                    commit('addPost')
                })
                .catch(err=>console.log(err))
        },
        imageUpload({commit}, imageFile){
            const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqvswev7i/image/upload'
            const CLOUDINARY_PRESET = 'kgqkrnni'
            let formData = new FormData()
            formData.append('file', imageFile)
            formData.append('upload_preset', CLOUDINARY_PRESET)
            Vue.http.post(CLOUDINARY_URL, formData ,{
                headers:{
                    'Content-type':'application/x-www-form-urlencoded'
                }
            })
                .then(res=>res.json())
                .then(data=>{
                    commit('imageUpload', data)
                })
                .catch(err=>console.log(err))
        },

        clearImageUpload({commit}){
            commit('clearImageUpload')
        },
        getAdminPosts({commit}){
            Vue.http.get(`posts.json?orderBy="$key"`)
                .then(res=>res.json())
                .then(data=>{
                    let posts = []
                    for(let key in data){
                        posts.push({
                            ...data[key],
                            id:key
                        })
                    }
                    commit('getAdminPosts', posts)
                })
                .catch(err=>console.log(err))
        },
        deletePost({commit, state}, id){
            Vue.http.delete(`posts/${id}.json?auth=${state.token}`)
                .then(res=>{
                    let newPosts = []
                    state.adminPosts.forEach(post=>{
                        if(post.id != id){
                            newPosts.push(post)
                        }
                    })
                    commit('getAdminPosts', newPosts)
                })
                .catch(err=>console.log(err))
        }
    }
}

export default admin