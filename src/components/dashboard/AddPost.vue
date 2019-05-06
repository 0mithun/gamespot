<template>
    <div class="dashboard_form">
        <h1>Add Post</h1>
        <form @submit.prevent="submitHandler">
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
                    <p class="error_label" v-if="!$v.formData.desc.maxLength">Description must be less than {{ $v.formData.desc.$params.maxLength.max }} character</p>
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
    </div>
</template>

<script>
    import {required, minLength, maxLength} from 'vuelidate/lib/validators'
    export default {
        data() {
            return {
                formData: {
                    title:'',
                    desc:'',
                    content:'',
                    rating:''
                }
            }
        },
        validations:{
            formData: {
                title:{
                    required
                },
                desc:{
                    required,
                    maxLength:maxLength(5)
                },
                rating:{
                    required
                }
            }
        }
    }
</script>

<style scoped>
    .input_field.invalid input, .input_field.invalid select{
        border:1px solid red;
    }
    .dashboard_form {
        width: 650px;
        margin-bottom: 100px;
    }
</style>