<script setup>

definePageMeta({
    layout: 'default',
    requireAuth: true,
    middleware: "auth",
    name: "restAPIUpdatePostPage"
})

import { Notify, Cookies } from 'quasar'
import { axiosAPI, getAllTags } from "@/api/axios"

const route = useRoute();

const post = ref({
    title: "",
    content: "",
    tag: []
});

const tags = ref([]);

const comment = ref("");
const commentCard = ref(false);

onMounted(async () => {
    tags.value = await getAllTags();
    await axiosAPI.get("/posts/" + route.params.slug).then(response => {
        post.value = response.data
    })
});

async function updatePost() {
    try {
        await axiosAPI.put(`/posts/${route.params.slug}/`, post.value)
            .then(response => {
                navigateTo({ name: "restAPIAllPostsPage" });
                Notify.create({
                    message: 'Post Updated Successfully',
                    type: "positive",
                    actions: [
                        { icon: 'close', color: 'white', round: true, }
                    ]
                })
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
}

async function createComment() {
    try {
        await axiosAPI.post('/comments/', {
            comment: comment.value,
            post: post.value.id
        }).then(response => {
            commentCard.value = false;
            navigateTo({ name: "restAPIAllPostsPage" });
            Notify.create({
                message: 'Thank ypu for commenting, your comment is waiting admin approval',
                type: "positive",
                actions: [
                    { icon: 'close', color: 'white', round: true, }
                ]
            })
        })
    } catch (error) {
        Notify.create({
            message: error.message,
            color: "negative",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
    };
}

</script>

<template>
    <q-page class="flex flex-center">
        <q-card flat bordered class="post-card">
            <q-card-section>
                <div class="row items-center no-wrap">
                    <div class="col">
                        <div class="text-h6">Update Post</div>
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
                    <q-select 
                        v-model="post.tag" 
                        multiple 
                        clearable 
                        :options="tags" 
                        emit-value 
                        label="Post Tags" 
                        map-options 
                        filled 
                        dense 
                        options-dense 
                        option-value="id"
                        option-label="name"
                        use-chips
                    />

                    <div class="q-pa-sm q-mt-md">
                        <q-btn label="Update" type="submit" color="primary" />
                        <q-btn label="Cancel" type="button" @click="() => { navigateTo({ name: 'restAPIAllPostsPage' }) }"
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
                        <q-form @submit.prevent="createComment(post.id)">
                            <q-input filled v-model.lazy.trim="comment" type="textarea" label="Comment" required
                                lazy-rules :rules="[val => val && val.length > 0 || 'Comment is required']" />
                            <div class="q-pa-sm q-mt-md">
                                <q-btn label="Add Comment" type="submit" color="primary" />
                                <q-btn label="Cancel" @click="commentCard = false" class="bg-grey-8 text-white q-ml-sm" />
                            </div>
                        </q-form>
                    </q-card-section>
                </q-card>
            </q-dialog>
        </q-card>
    </q-page>
</template>

<style>
.post-card {
    width: 500px
}
</style>