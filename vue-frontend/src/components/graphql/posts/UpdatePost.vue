<script>
import { Notify } from 'quasar'
import Multiselect from 'vue-multiselect'

import { axiosAPI } from "@/api/axios"
import { updatePostMutation, createCommentMutation } from "@/graphqlMutations"


export default {
    name: "EditPost",
    components: {
        Multiselect
    },
    data() {
        return {
            post: {
                title: "",
                content: "",
                tag: [],
            },
            tags: [],
            comment: "",
            commentCard: false,

        }
    },
    async mounted() {
        await axiosAPI.get('/tags/').then(response => {
            this.tags = response.data
        })
    },
    async created() {
        await axiosAPI.get("/posts/" + this.$route.params.slug)
            .then(response => {
                this.post = response.data
            });
    },
    methods: {
        async updatePost(e) {
            try {
                this.$apollo.mutate({
                    mutation: updatePostMutation,
                    variables: {
                        "id": parseInt(this.post.id),
                        "title": this.post.title,
                        "content": this.post.content,
                        "tags": this.post.tag
                    }
                })

                this.$router.push({ name: "graphql-posts-list" })
                Notify.create({
                    message: 'Post Updated Successfully',
                    type: 'positive',
                    actions: [
                        { icon: 'close', color: 'white', round: true, },
                    ]
                })
            } catch (error) {
                Notify.create({
                    message: error.message,
                    color: "negative",
                    actions: [
                        { icon: 'close', color: 'white', round: true, }
                    ]
                })
            }
        },

        async addComment() {
            try {
                await this.$apollo.mutate({
                    mutation: createCommentMutation,
                    variables: {
                        // https://stackoverflow.com/questions/73172384/variable-id-got-invalid-value-1-int-cannot-represent-non-integer-value-1
                        slug: this.$route.params.slug,
                        comment: this.comment
                    }
                })
                this.commentCard = false;
                this.$router.push({ name: "graphql-posts-list" })
                Notify.create({
                    message: 'Thank ypu for commenting, your comment is waiting admin approval',
                    type: "positive",
                    actions: [
                        { icon: 'close', color: 'white', round: true, }
                    ]
                })
            } catch (error) {
                Notify.create({
                    message: error.message,
                    color: "negative",
                    actions: [
                        { icon: 'close', color: 'white', round: true, }
                    ]
                })
            }
        },
        onReset() {
            this.comment = null
        }
    }
}
</script>


<template>
    <q-page class="flex flex-center">
        <q-card flat bordered class="my-card">
            <q-card-section>
                <div class="row items-center no-wrap">
                    <div class="col">
                        <div class="text-h6">Edit Post</div>
                    </div>
                </div>
            </q-card-section>

            <q-card-section>
                <q-form @submit.prevent="updatePost">
                    <q-input filled v-model="post.title" label="Post Title" required lazy-rules
                        :rules="[val => val && val.length > 0 || 'Post Title is required']" />

                    <q-input filled v-model="post.content" type="textarea" required label="Post Content" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Post Content is required']" />
                    <q-separator />
                    <q-separator />
                    <label>Post Tags</label>
                    <!-- https://github.com/shentao/vue-multiselect/issues/133#issuecomment-1652845391 -->
                    <multiselect v-model="post.tag" :multiple="true"
                        :custom-label="opt => tags.find(e => e.id === opt).name"
                        deselect-label="You must select at least one tag" :options="tags.map(i => i.id)"
                        :searchable="true" :allow-empty="false">
                        <template slot="singleLabel" slot-scope="{ tag }"><strong>{{ tag.name }}</strong></template>
                    </multiselect>
                    <!-- <select v-model="post.tag" multiple>
            <option v-for="tag in tags" id="tag.id" :value="tag.id">{{ tag.name }}</option>
          </select> -->
                    <div class="q-pa-sm q-mt-md">
                        <q-btn label="Edit" type="submit" color="primary" />
                        <q-btn label="Cancel" type="button"
                            @click="() => { this.$router.push({ name: 'graphql-posts-list' }) }"
                            class="bg-grey-8 text-white q-ml-sm" />
                    </div>
                </q-form>
            </q-card-section>

            <q-btn color="info" flat @click="commentCard = true">Add Comment</q-btn>

            <q-dialog v-model="commentCard">
                <q-card flat bordered class="my-card">
                    <q-card-section class="row items-center q-pb-none">
                        <div class="text-h6">Add Comment</div>
                        <q-space />
                        <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>


                    <q-card-section>
                        <q-form @submit.prevent="addComment(post.id)" @reset="onReset">
                            <q-input filled v-model.lazy.trim="comment" type="textarea" label="Comment" required
                                lazy-rules :rules="[val => val && val.length > 0 || 'Comment is required']" />
                            <div class="q-pa-sm q-mt-md">
                                <q-btn label="Add Comment" type="submit" color="primary" />
                                <q-btn label="Reset" type="reset" class="bg-grey-8 text-white q-ml-sm" />
                            </div>
                        </q-form>
                    </q-card-section>
                </q-card>
            </q-dialog>
        </q-card>
    </q-page>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  width: 500px
</style>