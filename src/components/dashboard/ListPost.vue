<template>
    <div>
        <md-table md-card>
            <md-table-row>
                <md-table-head>Title</md-table-head>
                <md-table-head>Description</md-table-head>
                <md-table-head>Rating</md-table-head>
                <md-table-head>Action</md-table-head>
            </md-table-row>
            <md-table-row v-for="post in posts" :key="post.id">
                <md-table-cell>{{post.title}}</md-table-cell>
                <md-table-cell>{{post.desc}}</md-table-cell>
                <md-table-cell>{{post.rating}}</md-table-cell>
                <md-table-cell>
                    <div class="post_delete" style="cursor: pointer" @click="deletePost(post.id)">Delete</div>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <md-dialog-confirm
            :md-active.sync="confirmDelete"
            md-title="Confirm Delete"
            md-content="Are you sure you want to delete?"
            md-confirm-text="Delete"
            md-cancel-text="Cancel"
            @md-cancel="onCancel"
            @md-confirm="onDelete"
        ></md-dialog-confirm>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                confirmDelete: false,
                toDelete:null
            }
        },
        created() {
            this.$store.dispatch('admin/getAdminPosts')
        },
        computed:{
            posts(){
                let posts = this.$store.getters['admin/getAdminPosts']
                return posts
            }
        },
        methods: {
            deletePost(id) {
                this.toDelete = id
                this.confirmDelete = true
            },
            onDelete(){
                this.$store.dispatch('admin/deletePost', this.toDelete)
            },
            onCancel(){
                this.toDelete = null
                this.confirmDelete = false
            }
        },
    }
</script>