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
  }
}
</script>

<style>
  @import "./assets/style.css";
</style>
