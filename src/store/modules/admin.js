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
        imageUpload: null

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
        }
    }
}

export default admin