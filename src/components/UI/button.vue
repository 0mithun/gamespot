<template>
    <div>
        <router-link :to="linkTo" :class="['button_default', ...addClass]" :style="ovStyle" v-if="type =='link'">
            <slot></slot>
        </router-link>
        <div v-if="type == 'btn'"  :class="['button_default', ...addClass]" :style="ovStyle" >
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            'linkTo':{
                required:false,
                default: '/'
            },
            addClass:{
                type:Array,
                default: ()=>{
                    return  []
                }
            },
            ovStyle:{
                type: Object,
                default: ()=>{
                    return {}
                }
            },
            type:{
                type:String,
                default: 'link'
            }
        }
    }
</script>