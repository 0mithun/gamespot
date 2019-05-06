<template>
    <div class="container dashboard_container">
        <div class="admin_nav">
            <ul>
                <li> <router-link to="/dashboard/add-post">Add Post</router-link> </li>
                <li> <router-link to="/dashboard/list-post">Manage Post</router-link> </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>


</style>