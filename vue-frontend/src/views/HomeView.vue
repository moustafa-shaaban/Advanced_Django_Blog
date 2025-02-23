<script setup>
// import { ref } from 'vue';
// import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query';
// import { Dialog, Notify, useQuasar, date, Cookies } from 'quasar';
// import Multiselect from 'vue-multiselect'

// import { getBlogPosts, deletePost, getAllTags, createPost, deleteComment, addPostToFavorites, likePost } from '@/api/axios';
// import router from '@/router';
// import { useAuthStore } from '@/stores/authStore';

// // Access QueryClient instance
// const queryClient = useQueryClient()

// const authStore = useAuthStore();
// const $q = useQuasar();

// const card = ref(false);
// const title = ref('')
// const content = ref('')
// const tag = ref([])

// // Query
// const { isPending, isError, data: posts, error } = useQuery({
//   queryKey: ['allBlogPosts'],
//   queryFn: getBlogPosts,
//   onError: async (error) => {
//     $q.notify({
//       message: error.message,
//       color: "negative",
//       actions: [
//         { icon: 'close', color: 'white', round: true, }
//       ]
//     })
//   }
// })

// const { data: tags } = useQuery({
//   queryKey: ['tags'],
//   queryFn: getAllTags,
//   onError: async (error) => {
//     $q.notify({
//       message: error.message,
//       color: "negative",
//       actions: [
//         { icon: 'close', color: 'white', round: true, }
//       ]
//     })
//   }
// })


// const deletePostMutation = useMutation({
//   mutationFn: deletePost,
//   onSuccess: () => {
//     queryClient.invalidateQueries({
//       queryKey: ["allBlogPosts"]
//     })
//   }
// })

// const deleteCommentMutation = useMutation({
//   mutationFn: deleteComment,
//   onSuccess: () => {
//     queryClient.invalidateQueries({
//       queryKey: ["allBlogPosts"]
//     })
//   }
// })

// const addPostToFavoritesMutation = useMutation({
//   mutationFn: addPostToFavorites,
//   onSuccess: () => {
//     queryClient.invalidateQueries({
//       queryKey: ["allBlogPosts"]
//     })
//   }
// });


// const likePostMutation = useMutation({
//   mutationFn: likePost,
//   onSuccess: () => {
//     queryClient.invalidateQueries({
//       queryKey: ["allBlogPosts"]
//     })
//   }
// });


// const { mutate } = useMutation({
//   mutationFn: createPost,
//   onSuccess: async () => {
//     queryClient.invalidateQueries("allBlogPosts")
//     await router.push('/')
//     $q.notify({
//       message: 'Post Added Successfully',
//       type: "positive",
//       actions: [
//         { icon: 'close', color: 'white', round: true, }
//       ]
//     })
//   },
//   onError: async (error) => {
//     $q.notify({
//       message: error.message,
//       color: "negative",
//       actions: [
//         { icon: 'close', color: 'white', round: true, }
//       ]
//     })
//   },
// })

// const deletePostFunction = (slug) => {
//   deletePostMutation.mutate(slug)
// }

// function confirmDeletePost(slug) {
//   $q.dialog({
//     title: 'Confirm',
//     message: 'Are you sure you want to delete this post?',
//     cancel: true,
//     persistent: true
//   }).onOk(() => {
//     deletePostFunction(slug)
//     router.push('/')
//     $q.notify({
//       message: 'Post Deleted Successfully',
//       type: "positive",
//       actions: [
//         { icon: 'close', color: 'white', round: true, }
//       ]
//     })
//   }).onCancel(() => {
//     return
//   }).onDismiss(() => {
//     return
//   })
// }

// const removePostFromFavorites = (id) => {
//   addPostToFavoritesMutation.mutate(id)
// }

// const addPostToUserFavorites = (id) => {
//   addPostToFavoritesMutation.mutate(id)
// }

// const HandleLikePost = (id) => {
//   likePostMutation.mutate(id)
// }

// const unlikePost = (id) => {
//   likePostMutation.mutate(id)
// }

// function confirmRemovePostFromFavorites(id) {
//   Dialog.create({
//     title: 'Confirm',
//     message: 'Are you sure you want to remove this post from your favorites list?',
//     cancel: true,
//     persistent: true
//   }).onOk(() => {
//     removePostFromFavorites(id)
//     router.push('/')
//     Notify.create({
//       message: 'Removed Post from Favorites Successfully',
//       type: 'positive',
//       actions: [
//         { label: 'Dismiss', color: 'white' }
//       ]
//     })
//   }).onCancel(() => {
//     return
//   }).onDismiss(() => {
//     return
//   })
// }

// const deleteCommentFunction = (id) => {
//   deleteCommentMutation.mutate(id)
// }

// function confirmDeleteComment(id) {
//   Dialog.create({
//     title: 'Confirm',
//     message: 'Are you sure you want to delete this comment?',
//     cancel: true,
//     persistent: true
//   }).onOk(() => {
//     deleteCommentFunction(id)
//     Notify.create({
//       message: 'Comment Deleted Successfully',
//       type: "positive",
//       actions: [
//         { icon: 'close', color: 'white', round: true, }
//       ]
//     })
//   }).onCancel(() => {
//     return
//   }).onDismiss(() => {
//     return
//   })
// }

// function addPost() {
//   mutate({
//     title: title.value,
//     content: content.value,
//     tag: tag.value
//   })
//   card.value = false;
//   title.value = null
//   content.value = null
//   tag.value = null
// }

// function onReset() {
//   title.value = null
//   content.value = null
// }
</script>

<template>
  <q-page class="q-mt-sm flex flex-center">
    HomePage
  </q-page>
</template>

<style lang="sass">

.posts-card
  width: 100%
  max-width: 900px

.my-card
  width: 100%
  max-width: 400px

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
