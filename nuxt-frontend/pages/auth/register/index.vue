<script setup>
import { reactive } from 'vue';
import { Notify } from 'quasar'

import { useAuthStore } from '@/stores/authStore';

definePageMeta({
  layout: 'default',
  requireAuth: false,
  middleware: "auth",
  name: "registerPage"
})

const authStore = useAuthStore();

const user = reactive({
  username: '',
  email: '',
  password: '',
  password2: '',
})

async function register() {
  await authStore.register(user)
  navigateTo('/auth/login')
  Notify.create({
    message: 'Registered Successfully, email confirmation link sent',
    type: "positive",
    actions: [
      { icon: 'close', color: 'white', round: true, }
    ]
  })
  // try {
  //   await authStore.register(user)
  //   router.push('/verify-email')
  //   Notify.create({
  //     message: 'Registered Successfully, email confirmation link sent',
  //     type: "positive",
  //     actions: [
  //       { icon: 'close', color: 'white', round: true, }
  //     ]
  //   })
  // } catch (error) {
  //   Notify.create({
  //     message: error.message,
  //     color: "negative",
  //     actions: [
  //       { icon: 'close', color: 'white', round: true, }
  //     ]
  //   })
  // }
}

function onReset() {
  user = null
}
</script>


<template>
  <q-page class="flex flex-center">
    <q-card v-if="!authStore.isAuthenticated" flat bordered class="my-card">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Register for a new account</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="register" @reset="onReset">
          <!-- <q-input filled v-model="user.name" label="Name" required lazy-rules
            :rules="[val => val && val.length > 0 || 'Name is required']" /> -->
          <q-input filled v-model="user.email" type="email" required label="Email" lazy-rules
            :rules="[val => val && val.length > 0 || 'Email is required']" />
          <q-input filled v-model="user.username" type="text" label="Username" required lazy-rules
            :rules="[val => val && val.length > 0 || 'Username is required']" />
          <q-input filled v-model="user.password" type="password" required label="Password" lazy-rules
            :rules="[val => val && val.length > 0 || 'Password is required']" />
          <q-input filled v-model="user.password2" type="password" required label="Confirm Password" lazy-rules
            :rules="[val => val && val.length > 0 || 'Password is required']" />
          <!-- <q-input filled v-model="user.birthday" type="date" required label="Date of Birth" lazy-rules
            :rules="[val => val && val.length > 0 || 'Date of Birth is required']" /> -->
          <q-separator />
          <div class="q-pa-sm q-mt-md">
            <q-btn label="Register" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" class="bg-grey-8 text-white q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>