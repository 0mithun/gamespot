<template>
    <div class="dashboard_form">

        <div class="left_align">
            <h1>Add Post</h1>
            <div v-if="addPostStatus" class="post_succesfull">Your post was posted</div>
            <form @submit.prevent="submitHandler">


                <div class="input_field">
                    <input
                            type="file"
                            @change="processFile($event)"
                            ref="myFileInput"
                    >
                </div>
                <div class="input_field" :class="{invalid:$v.formData.title.$error}">
                    <label for="Title">Title</label>
                    <input
                            type="text"
                            id="title"
                            v-model="formData.title"
                            @blur="$v.formData.title.$touch()"
                    />
                    <p class="error_label" v-if="$v.formData.title.$error">Title Field is required</p>
                </div>
                <div class="input_field" :class="{invalid:$v.formData.desc.$error}">
                    <label for="desc">Description</label>
                    <input
                            type="text"
                            id="desc"
                            v-model="formData.desc"
                            @blur="$v.formData.desc.$touch()"
                    >
                    <div v-if="$v.formData.desc.$error">
                        <p class="error_label" v-if="!$v.formData.desc.required">Description Field is required</p>
                        <p class="error_label" v-if="!$v.formData.desc.maxLength">Description must be less than {{
                            $v.formData.desc.$params.maxLength.max }} character</p>
                    </div>
                </div>
                <div class="input_field">
                    <wysiwyg v-model="formData.content"></wysiwyg>
                </div>
                <div class="input_field" :class="{invalid:$v.formData.rating.error}">
                    <label for="rating">Rating</label>
                    <select
                            id="rating"
                            v-model.number="formData.rating"
                            @blur="$v.formData.rating.$touch()"
                    >
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <p class="error_label" v-if="$v.formData.rating.$error">Rating Field is required</p>
                </div>
                <button type="submit">Add Post</button>


            </form>

            <md-dialog :md-active="dialog">
                <p>Your post has not content, are you sure you want to post this?</p>
                <md-dialog-actions>
                    <md-button class="md-accent md-raised md-dense" @click="dialogOnCancel">Oop, I want to add it.
                    </md-button>
                    <md-button class="md-primary md-raised md-dense" @click="dialogOnConfirm">Yes I'm sure</md-button>
                </md-dialog-actions>
            </md-dialog>
        </div>
        <div  class="right_align">
            <img :src="imageUpload" alt="">
        </div>
    </div>
</template>

<script>
    import {required, minLength, maxLength} from 'vuelidate/lib/validators'
    export default {
        data() {
            return {
                dialog: false,
                formData: {
                    img: '',
                    title: '',
                    desc: '',
                    content: '',
                    rating: ''
                }
            }
        },
        computed: {
            addPostStatus() {
                let status = this.$store.getters['admin/addPostStatus'];
                if (status) {
                    this.clearForm()
                    this.$store.commit('admin/clearImageUpload')
                }
                return status
            },
            imageUpload() {
                let imageUrl = this.$store.getters['admin/imageUploadStatus']
                this.formData.img = imageUrl
                return imageUrl
            }
        },
        validations: {
            formData: {
                title: {
                    required
                },
                desc: {
                    required,
                    maxLength: maxLength(100)
                },
                rating: {
                    required
                }
            }
        },
        methods: {
            submitHandler() {
                if (!this.$v.$invalid) {
                    if (this.formData.content === '') {
                        this.dialog = true
                    } else {
                        this.addPost()
                    }
                } else {
                    alert("Something is wrong")
                }
            },
            addPost() {
                this.$store.dispatch('admin/addPost', this.formData)
            }, dialogOnCancel() {
                this.dialog = false
            },
            dialogOnConfirm() {
                this.dialog = false
                this.addPost()
            },
            clearForm() {
                this.$v.$reset()
                this.$refs.myFileInput.value = ''
                this.formData = {
                    img : '',
                    title : '',
                    desc : '',
                    content : '',
                    rating : ''
                }

            },
            processFile(event) {
                let file = event.target.files[0]
                this.$store.dispatch('admin/imageUpload', file)
            }

        },

        destroyed() {
            this.$store.commit('admin/clearImageUpload')
        }
    }
</script>

<style scoped>
    .input_field.invalid input, .input_field.invalid select {
        border: 1px solid red;
    }

    .dashboard_form {
        margin-bottom: 100px;
    }
    .left_align {
        width: 700px;
        overflow: hidden;
        float: left;
    }
    .right_align {
        float: right;
        overflow: hidden;
        min-height: 100px;
        overflow: hidden;
        width: 380px;
        margin: 10px;
        margin-top: 70px;
    }
</style>