 import Vue from 'vue'

 const FBaseAuth = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
 const FBaseApiKey = 'AIzaSyBscQAl1nPwOAip20Kiin9q4TKYpm0eyy4'
 const admin = {
    namespaced: true,
     state:{
        token:null,
         refresh:null,
         authFailed:false

     },
     getters:{

     },
     mutations:{
        authUser(state, authData){
            state.token = authData.idToken
            state.refresh = authData.refreshToken
        },
         authFailed(state, type){
            if(type ==='reset'){
                state.authFailed = false
            }else{
                state.authFailed = true
            }
         }
     },
     actions:{
        signIn({commit}, payload){
            Vue.http.post(`${FBaseAuth}/verifyPassword?key=${FBaseApiKey}`, {
                returnSecureToken: true,
                ...payload
            })
                .then(res=>res.json())
                .then(authData =>{
                    commit('authUser',{
                        ...authData,
                        type:'signin'
                    })
                    localStorage.setItem('token', authData.idToken)
                    localStorage.setItem('refresh', authData.refreshToken)
                })
                .catch(err=>{
                    commit('authFailed','')
                })
        }
     }
 }

 export  default admin