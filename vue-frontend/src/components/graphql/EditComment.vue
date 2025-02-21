<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { useQuery, useMutation } from '@tanstack/vue-query';
import { getCommentById } from '@/graphqlQueries';
import { updateCommentMutation } from '@/graphqlMutations';
import { axiosGraphQL } from '@/api/axios';


const route = useRoute()
const router = useRouter()
const commentData = ref("")


async function updateComment() {
    const response = await axiosGraphQL({
        method: 'post',
        data: {
            query: updateCommentMutation,
            variables: {
                "id": parseInt(commentData.value.id),
                "comment": commentData.value.comment,
            }
        },
    })

    return response.data
}

const { mutate } = useMutation({
    mutationFn: updateComment,
    onSuccess: async () => {
        await router.push('/graphql/post-list')
        Notify.create({
            message: 'Tag Added Successfully',
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
        comment: commentData.value,
    })
}



async function getComment() {
    const response = await axiosGraphQL({
        method: 'post',
        data: {
            query: getCommentById,
            variables: {
                id: parseInt(route.params.id)
            },
        }
    })

    // Make a copy of the returned data because the data saved in the cache is read-only
    commentData.value = { ...response.data.data.commentById }
    return response.data
}

const { data, error, isLoading, isError } = useQuery({
    queryKey: ['graphqlGetComment'],
    queryFn: getComment,
    onError: async (error) => {
        Notify.create({
            message: error.message,
            color: "negative",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
    },

})

</script>

<!-- <script>
import { Notify } from 'quasar';

import { getCommentById } from '@/graphqlQueries';
import { updateCommentMutation } from '@/graphqlMutations';



export default {
    methods: {


        async getComment() {
            let data = await this.$apollo.query({
                query: getCommentById,
                variables: {
                    id: parseInt(this.$route.params.id)
                },
            })

            // Make a copy of the returned data because the data saved in the cache is read-only
            const commentData = { ...data.data.commentById }
            console.log(commentData)
            this.comment = commentData
        },

        async updateComment() {
            try {
                this.$apollo.mutate({
                    mutation: updateCommentMutation,
                    variables: {
                        "id": parseInt(this.comment.id),
                        "comment": this.comment.comment
                    }
                })
                this.$router.push("/graphql/post-list")
                Notify.create({
                    message: 'Comment Updated Successfully',
                    type: 'positive',
                    actions: [
                        { label: 'Refresh', color: 'white', handler: () => { this.refreshPage() } },
                        { icon: 'close', color: 'white', round: true, },
                    ]
                })
            } catch (error) {
                Notify.create({
                    message: error.message,
                    type: 'negative',
                    actions: [
                        { icon: 'close', color: 'white', round: true, },
                    ]
                })
            }
        }
    }
}
</script> -->

<template>
    <q-page class="flex flex-center">
        <q-card flat bordered class="my-card">
            <q-card-section>
                <div class="row items-center no-wrap">
                    <div class="col">
                        <div class="text-h6">Edit Comment</div>
                    </div>
                </div>
            </q-card-section>

            <q-card-section>
                <span v-if="isLoading">Loading...</span>
                <span v-else-if="isError">Error: {{ error.message }}</span>
                <q-form v-else @submit.prevent="handleSubmit">
                    <q-input filled v-model="commentData.comment" label="Comment" required lazy-rules
                        :rules="[val => val && val.length > 0 || 'Comment is required']" />

                    <div class="q-pa-sm q-mt-md">
                        <q-btn label="Edit" type="submit" color="primary" />
                        <q-btn label="Cancel" type="button" @click="() => { router.push('/graphql/post-list') }"
                            class="bg-grey-8 text-white q-ml-sm" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<style lang="sass" scoped>
.my-card
    width: 100%
    width: 500px
</style>