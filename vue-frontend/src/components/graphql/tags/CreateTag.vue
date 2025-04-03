<script setup>
import { ref } from "vue";
import { Notify } from "quasar";
import { useRouter } from 'vue-router';
import { createTagMutation } from "@/graphqlMutations";
import { useQueryClient, useMutation } from '@tanstack/vue-query';
import { axiosGraphQL } from "@/api/axios";

const router = useRouter()
const queryClient = useQueryClient();
const name = ref("");

async function createTag() {
    const response = await axiosGraphQL({
        method: 'post',
        data: {
            query: createTagMutation,
            variables: {
                "name": name.value,
            }
        },
    })

    return response.data
}

const { mutate } = useMutation({
    mutationFn: createTag,
    onSuccess: async () => {
        queryClient.invalidateQueries("graphqlAllTags")
        await router.push({ name: "graphql-tags" })
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
        name: name.value,
    })
}

function onReset() {
    name.value = null
}
</script>

<template>
    <q-page class="flex flex-center">
        <q-card flat bordered class="my-card">
            <q-card-section>
                <div class="row items-center no-wrap">
                    <div class="col">
                        <div class="text-h6">Add Tag</div>
                    </div>
                </div>
            </q-card-section>

            <q-card-section>
                <q-form @submit.prevent="handleSubmit" @reset="onReset">
                    <q-input filled v-model.lazy.trim="name" label="Tag name" required lazy-rules
                        :rules="[val => val && val.length > 0 || 'Tag name is required']" />
                    <div class="q-pa-sm q-mt-md">
                        <q-btn label="Create Tag" type="submit" color="primary" />
                        <q-btn label="Reset" type="reset" class="bg-grey-8 text-white q-ml-sm" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>
