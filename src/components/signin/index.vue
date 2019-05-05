<template>
        <div class="container">`
            <div class="signin_container">
                <h1>Sign In</h1>
                <form @submit.prevent="onSubmit">
                    <div class="input_field" :class="{invalid:$v.formData.email.$error}">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            v-model.trim="formData.email"
                            @blur="$v.formData.email.$touch()"
                        >
                        <div v-if="$v.formData.email.$error">
                            <p class="error_label" v-if="!$v.formData.email.required">The field is required</p>
                            <p class="error_label" v-if="!$v.formData.email.email">Please enter a valid email</p>
                        </div>
                    </div>
                    <div class="input_field"  :class="{invalid:$v.formData.password.$error}">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            v-model.trim="formData.password"
                            @blur="$v.formData.password.$touch()"
                        >
                        <div v-if="$v.formData.password.$error">
                            <p class="error_label" v-if="!$v.formData.password.required">The field is required</p>
                        </div>
                    </div>

                    <button type="submit">Sign In</button>
                    <p class="error_label" v-if="error">
                        Something is wrong
                    </p>
                    <p class="error_label" v-if="authFailed">
                        email and/or password dose not match
                    </p>
                </form>
            </div>
        </div>
</template>

<script>
    import  {mapActions} from 'vuex'
    import {required, email} from 'vuelidate/lib/validators'
    export default {
        data() {
            return {
                error:false,
                formData: {
                    email:'mithun@techmithun.com',
                    password:'123456'
                }
            }
        },
        computed: {
            authFailed() {
                return this.$store.state.admin.authFailed;
            }
        },
        destroyed(){
            this.$store.commit('admin/authFailed', 'reset')
        },
        validations:{
            formData: {
                email:{
                    required, email
                },
                password:{
                    required
                }
            }
        },
        methods: {
            onSubmit() {
                if(!this.$v.$invalid){
                    this.$store.dispatch('admin/signIn', this.formData)
                }else {
                    this.error = true
                    setTimeout(()=>{
                        this.error = false
                    }, 3000)
                }
            }
        },
    }
</script>

<style >
    .input_field.invalid input, .input_field.invalid select{
        border:1px solid red;
    }
</style>