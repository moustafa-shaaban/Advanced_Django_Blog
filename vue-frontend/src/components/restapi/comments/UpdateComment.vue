<script>
import { Notify, Cookies } from 'quasar';

import { axiosAPI } from '@/api/axios';


export default {
    name: "EditComment",
    data() {
        return {
            comment: {
                comment: "",
            }
        }
    },
    async mounted() {
        await axiosAPI.get('/comments/' + this.$route.params.id).then((response) => {
            this.comment = response.data
        })
    },
    methods: {
        async updateComment() {
            try {
                await axiosAPI.put(`/comments/${this.comment.id}/`, this.comment).then(response => {
                    this.$router.push({ name: 'posts-list' });
                    Notify.create({
                        message: 'Comment Updated Successfully',
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
    }
}
</script>

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
                <q-form @submit.prevent="updateComment">
                    <q-input filled v-model="comment.comment" label="Comment" required lazy-rules
                        :rules="[val => val && val.length > 0 || 'Comment is required']" />

                    <q-separator />
                    <div class="q-pa-sm q-mt-md">
                        <q-btn label="Edit" type="submit" color="primary" />
                        <q-btn label="Cancel" type="button" @click="() => { this.$router.push({ name: 'posts-list' }) }"
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