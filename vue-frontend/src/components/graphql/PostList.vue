<script setup>
import { ref } from 'vue';
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query';
import { date, Notify, Dialog } from 'quasar';
import { getAllPosts, getAllTags } from '@/graphqlQueries';
import { useAuthStore } from '@/stores/authStore';
import { axiosGraphQL } from '@/api/axios';
import { createPostMutation, deletePostMutation, deleteCommentMutation, addPostToUserFavoritesMutation, likePostMutation } from '@/graphqlMutations';
import { useRouter } from 'vue-router';
import Multiselect from 'vue-multiselect'
const authStore = useAuthStore();

const router = useRouter()

const queryClient = useQueryClient();

const postCard = ref(false);
const title = ref('')
const content = ref('')
const tag = ref([])

// Source: https://stackoverflow.com/a/59778006
async function getPosts() {
    const response = await axiosGraphQL({
        method: 'post',
        data: {
            query: getAllPosts
        }
    })
    return response.data
}


const { data, error, isLoading, isError } = useQuery({
    queryKey: ['graphqlAllPosts'],
    queryFn: getPosts,
    onError: async (error) => {
        Notify.create({
            message: error.message,
            color: "negative",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
    }
})


async function getTags() {
    const response = await axiosGraphQL({
        method: 'post',
        data: {
            query: getAllTags
        }
    })

    return response.data
}


const { data: tags } = useQuery({
    queryKey: ['graphqlAllTags'],
    queryFn: getTags,
    onError: async (error) => {
        Notify.create({
            message: error.message,
            color: "negative",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
    }
})



async function addPost() {
    const response = await axiosGraphQL({
        method: 'post',
        data: {
            query: createPostMutation,
            variables: {
                "title": title.value,
                "content": content.value,
                // Source: https://www.geeksforgeeks.org/how-to-convert-array-of-strings-to-array-of-numbers-in-javascript/
                "tags": tag.value.map(Number)
            }
        },
    })

    return response.data
}

const { mutate } = useMutation({
    mutationFn: addPost,
    onSuccess: async () => {
        queryClient.invalidateQueries("graphqlAllPosts")
        await router.push('/graphql/post-list')
        Notify.create({
            message: 'Post Added Successfully',
            type: "positive",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
    },
    onError: async (error) => {
        Notify.create({
            message: error.message,
            type: "negative",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
    },
})

async function deletePostFunction(id) {
    const response = await axiosGraphQL({
        method: 'post',
        data: {
            query: deletePostMutation,
            variables: {
                "id": parseInt(id),
            }
        },
    })

    return response.data
}

const { mutate: deletePost } = useMutation({
    mutationFn: deletePostFunction,
    onSuccess: async () => {
        queryClient.invalidateQueries("graphqlAllPosts")
    },
    onError: async (error) => {
        Notify.create({
            message: error.message,
            type: "negative",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
    },
})

function confirmDeletePost(id) {
    Dialog.create({
        title: 'Confirm',
        message: 'Are you sure you want to delete this post?',
        cancel: true,
        persistent: true
    }).onOk(() => {
        deletePost(id)
        Notify.create({
            message: 'Post Deleted Successfully',
            type: 'positive',
            actions: [
                { label: 'Dismiss', color: 'white' }
            ]
        })
    }).onCancel(() => {
        return
    })
}

async function favoritePostFunction(id) {
    const response = await axiosGraphQL({
        method: 'post',
        data: {
            query: addPostToUserFavoritesMutation,
            variables: {
                "id": parseInt(id),
            }
        },
    })

    return response.data
}

const { mutate: favoritePost } = useMutation({
    mutationFn: favoritePostFunction,
    onSuccess: async () => {
        queryClient.invalidateQueries("graphqlAllPosts")
        Notify.create({
            message: 'Added Post to your Favorites Successfully',
            type: 'positive',
            actions: [
                { label: 'Dismiss', color: 'white' }
            ]
        })

    },
    onError: async (error) => {
        Notify.create({
            message: error.message,
            type: "negative",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
    },
})

async function unfavoritePostFunction(id) {
    const response = await axiosGraphQL({
        method: 'post',
        data: {
            query: addPostToUserFavoritesMutation,
            variables: {
                "id": parseInt(id),
            }
        },
    })

    return response.data
}

const { mutate: unfavoritePost } = useMutation({
    mutationFn: unfavoritePostFunction,
    onSuccess: async () => {
        queryClient.invalidateQueries("graphqlAllPosts")
    },
    onError: async (error) => {
        Notify.create({
            message: error.message,
            type: "negative",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
    },
})

function confirmRemovePostFromFavorites(id) {
    Dialog.create({
        title: 'Confirm',
        message: 'Are you sure you want to remove this post from your favorites list?',
        cancel: true,
        persistent: true
    }).onOk(() => {
        unfavoritePost(id)
        Notify.create({
            message: 'Post removed from favorites Successfully',
            type: 'positive',
            actions: [
                { label: 'Dismiss', color: 'white' }
            ]
        })
    }).onCancel(() => {
        return
    })
}

async function likePostFunction(id) {
    const response = await axiosGraphQL({
        method: 'post',
        data: {
            query: likePostMutation,
            variables: {
                "id": parseInt(id),
            }
        },
    })

    return response.data
}

const { mutate: likePost } = useMutation({
    mutationFn: likePostFunction,
    onSuccess: async () => {
        queryClient.invalidateQueries("graphqlAllPosts")
        Notify.create({
            message: 'Liked Post',
            type: 'positive',
            actions: [
                { label: 'Dismiss', color: 'white' }
            ]
        })
    },
    onError: async (error) => {
        Notify.create({
            message: error.message,
            type: "negative",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
    },
})

async function unlikePostFunction(id) {
    const response = await axiosGraphQL({
        method: 'post',
        data: {
            query: likePostMutation,
            variables: {
                "id": parseInt(id),
            }
        },
    })

    return response.data
}

const { mutate: unlikePost } = useMutation({
    mutationFn: unlikePostFunction,
    onSuccess: async () => {
        queryClient.invalidateQueries("graphqlAllPosts")
        Notify.create({
            message: 'unLiked Post',
            type: 'positive',
            actions: [
                { label: 'Dismiss', color: 'white' }
            ]
        })
    },
    onError: async (error) => {
        Notify.create({
            message: error.message,
            type: "negative",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
    },
})



function handleSubmit() {
    mutate({
        title: title.value,
        content: content.value,
        tags: tag.value,
    })
    postCard.value = false;
}

function onReset() {
    title.value = null
    content.value = null
    tags.value = null
}
</script>

<template>
    <main class="q-mt-sm flex flex-center">
        <span v-if="isLoading">Loading...</span>
        <span v-else-if="isError">Error: {{ error.message }}</span>
        <div v-else class="q-mt-lg">
            <q-card v-for="post in data.data.allPosts" :key="post.id" class="my-card q-mt-md" flat bordered>
                <q-item>
                    <!-- <q-item-section avatar>
                        <q-avatar>
                            <img :src="post.author.avatar" />
                        </q-avatar>
                    </q-item-section> -->

                    <q-item-section>
                        <div class="text-h5">{{ post.title }}</div>
                        <q-item-label caption>
                            by: {{ post.author.username }}
                        </q-item-label>
                        <div class="q-gutter-sm q-mt-xs">
                            <q-badge v-for="tag in post.tag" :key="tag.id" caption outline color="primary"
                                :label="tag.name" />
                        </div>
                    </q-item-section>
                </q-item>

                <q-separator />

                <q-card-section horizontal>
                    <q-card-section>
                        {{ post.content }}
                    </q-card-section>
                </q-card-section>

                <q-separator />

                <q-card-actions v-if="authStore.$state.isAuthenticated" vertical>
                    <q-btn size="sm" flat icon="event">
                        Published At: {{ date.formatDate(post.publishedAt) }}
                    </q-btn>
                    <q-btn size="sm" flat icon="event">
                        Last Updated: {{ date.formatDate(post.updatedAt) }}
                    </q-btn>
                </q-card-actions>

                <q-card-actions
                    v-if="authStore.$state.isAuthenticated && authStore.$state.username === post.author.username">
                    <router-link :to="{ name: 'graphql-edit-post', params: { slug: post.slug } }">
                        <q-btn flat color="primary">
                            Detail
                        </q-btn>
                    </router-link>
                    <q-btn color="info" flat @click="confirmDeletePost(post.id)">Delete</q-btn>
                    <q-btn v-if="post.favorites.length > 0" color="info" flat
                        @click="confirmRemovePostFromFavorites(post.id)">Remove from favorites</q-btn>
                    <q-btn v-else color="info" flat @click="favoritePost(post.id)">Add to favorites</q-btn>
                    <q-btn v-if="post.likes.length > 0" color="info" flat @click="unlikePost(post.id)">Unlike</q-btn>
                    <q-btn v-else color="info" flat @click="likePost(post.id)">Like</q-btn>
                </q-card-actions>

                <q-separator />
                <q-card class="my-card">
                    <q-toolbar>
                        <q-toolbar-title><span class="text-weight-bold">Comments</span></q-toolbar-title>
                    </q-toolbar>

                    <q-card-section v-if="post.comments.length > 0">
                        <q-card-section v-for="comment in post.comments" key="comment.id">
                            <div class="text-h5">{{ comment.comment }}</div>
                            <q-item-label caption>
                                by: {{ comment.user.username }}
                            </q-item-label>
                            <q-card-actions
                                v-if="authStore.$state.isAuthenticated && authStore.$state.username === comment.user.username">
                                <router-link :to="{ name: 'graphql-edit-comment', params: { id: comment.id } }">
                                    <q-btn flat color="primary">
                                        Edit
                                    </q-btn>
                                </router-link>
                                <q-btn color="info" flat @click="confirmDeleteComment(comment.id)">Delete</q-btn>
                            </q-card-actions>
                        </q-card-section>
                    </q-card-section>
                    <q-card-section horizontal v-else>
                        <p>This post has no comments</p>
                    </q-card-section>
                </q-card>
            </q-card>

            <q-dialog v-model="postCard" persistent>
                <q-card flat bordered class="my-card">
                    <q-card-section class="row items-center q-pb-none">
                        <div class="text-h6">Add Post</div>
                        <q-space />
                        <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>


                    <q-card-section>
                        <q-form @submit.prevent="handleSubmit" @reset="onReset">
                            <q-input filled v-model.lazy.trim="title" label="Post Title" required lazy-rules
                                :rules="[val => val && val.length > 0 || 'Post Title is required']" />

                            <q-input filled v-model.lazy.trim="content" type="textarea" required label="Post Content"
                                lazy-rules :rules="[val => val && val.length > 0 || 'Post Content is required']" />
                            <q-separator />
                            <label>Post Tags</label>
                            <!-- https://github.com/shentao/vue-multiselect/issues/133#issuecomment-1652845391 -->
                            <multiselect v-model="tag" :multiple="true"
                                :custom-label="opt => tags.data.allTags.find(e => e.id === opt).name"
                                deselect-label="You must select at least one tag"
                                :options="tags.data.allTags.map(tag => tag.id)" :searchable="true" :allow-empty="false">
                                <template slot="singleLabel" slot-scope="{ tag }"><strong>{{ tag.name
                                }}</strong></template>
                            </multiselect>
                            <div class="q-pa-sm q-mt-md">
                                <q-btn label="Add Post" type="submit" color="primary" />
                                <q-btn label="Reset" type="reset" class="bg-grey-8 text-white q-ml-sm" />
                            </div>
                        </q-form>
                    </q-card-section>
                </q-card>
            </q-dialog>

            <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-btn fab icon="add" color="primary" @click="postCard = true">
                </q-btn>
            </q-page-sticky>
        </div>
    </main>
</template>

<style lang="sass">
.my-card
  width: 100%
  max-width: 600px

.q-dark div,
.body--dark div
  .multiselect__tags
    background-color: rgb(24, 26, 27)
    color: white
  .multiselect__input
    background-color: rgb(24, 26, 27)
    color: white
  .multiselect__content-wrapper
      background-color: rgb(24, 26, 27)
      color: white
  .multiselect__placeholder
    color: white
</style>