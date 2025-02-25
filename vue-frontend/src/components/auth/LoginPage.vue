<template>
  <q-page class="flex flex-center">
    <q-card v-if="!authStore.isAuthenticated" flat bordered class="my-card">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Sign to your account</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="login" @reset="onReset">
          <q-input filled type="email" v-model="user.email" label="Email" required lazy-rules
            :rules="[val => val && val.length > 0 || 'Email is required']" />

          <q-input filled v-model="user.password" type="password" required label="Password" lazy-rules
            :rules="[val => val && val.length > 0 || 'Password is required']" />
          <q-separator />
          <div class="q-pa-sm q-mt-md">
            <q-btn label="Login" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" class="bg-grey-8 text-white q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { Notify, Cookies } from 'quasar'
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const router = useRouter();

const user = reactive({
  email: '',
  password: ''
})

onMounted(() => {
  if (!Cookies.get('csrftoken')) {
    try {
      authStore.getCSRFToken();
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
});

async function login() {
  try {
    await authStore.login(user)
    router.push('/')
    Notify.create({
      message: 'Logged in Successfully',
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
};

function onReset() {
  this.email = null
  this.password = null
}
</script>

<!-- <script>
import { Notify } from 'quasar'
import { useRouter } from 'vue-router';
import { Cookies } from "quasar";

import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';

export default {
  name: "LoginPage",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter()
    return { authStore, router };
  },
  async mounted() {
    if (!Cookies.get('csrftoken')) {
      try {
        await this.authStore.getCSRFToken();
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
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
        await this.authStore.login(this.email, this.password)
        this.router.push('/')
        Notify.create({
          message: 'Logged in Successfully',
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
      this.email = null
      this.password = null
    }
  },

}
</script> -->