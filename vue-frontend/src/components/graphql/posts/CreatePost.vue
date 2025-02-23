<script setup>
import { ref } from 'vue';
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query';
import { Notify } from 'quasar';
import { getAllTags } from '@/graphqlQueries';
import { axiosGraphQL } from '@/api/axios';
import { createPostMutation } from '@/graphqlMutations';
import { useRouter } from 'vue-router';
import Multiselect from 'vue-multiselect'


const router = useRouter()

const queryClient = useQueryClient();

const title = ref('')
const content = ref('')
const tag = ref([])


async function getTags() {
    const response = await axiosGraphQL({
        method: 'post',
        data: {
            query: getAllTags
        }
    })

    return response.data
}


const { data: tags, error, isLoading, isError } = useQuery({
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
        await router.push({ name: 'graphql-posts-list' })
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

function handleSubmit() {
    mutate({
        title: title.value,
        content: content.value,
        tags: tag.value,
    })
}

function onReset() {
    title.value = null
    content.value = null
    tag.value = null
}
</script>

<template>
    <q-page class="q-mt-sm flex flex-center">
        <span v-if="isLoading">Loading...</span>
        <span v-else-if="isError">Error: {{ error.message }} </span>

        <div v-else class="q-mt-lg">
            <q-card flat bordered>
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
        </div>
    </q-page>
</template>

<style lang="sass">
.my-card
  width: 100%
  max-width: 800px

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