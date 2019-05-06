<template>
  <div>
    <AppHeader></AppHeader>
    <div>
      <router-view></router-view>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
  import 'vue-material/dist/vue-material.min.css'

import AppHeader from './components/header-footer/Header'
import AppFooter from './components/header-footer/Footer'
export default {
  components:{
    AppHeader,
    AppFooter
  },
  created() {
    this.$store.dispatch('admin/refreshToken')
  }
}
</script>

<style>
  @import "~vue-wysiwyg-lite/dist/vueWysiwyg.css";
  @import "./assets/style.css";
</style>
