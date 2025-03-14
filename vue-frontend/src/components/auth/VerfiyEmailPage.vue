<template>
    <h5>Please Verify your email</h5>
    <p>Please click on the link we sent to our email address to confirm your email</p>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { Notify } from 'quasar';
import { axiosAPI } from '@/api/axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
//import { axiosAPI } from "../../api/axios";

const authStore = useAuthStore()
const message = ref('');
const key = ref('');
const code = ref('');
const router = useRouter();

// onMounted(() => {
//     const response = axiosAPI.get("http://localhost:8000/_allauth/browser/v1/auth/email/verify", key, message, code);
//     console.log(response.data)
// })

async function submit() {
  try {
    await authStore.verifyEmail(key.value)
    router.push('/login')
    Notify.create({
      message: 'Email Verifyied Successfully, navigating to login',
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
}
</script>
