<template>
    <q-layout view="hHh lpR fFf">
        <q-header reveal elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title>
                    <q-breadcrumbs v-if="authStore.$state.isAuthenticated"
                        active-color="$q.dark.isActive > 'white' : 'dark'" style="font-size: 16px">
                        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
                        <q-breadcrumbs-el label="Home" icon="home" to="/" />
                        <q-breadcrumbs-el :label="username" icon="home" />
                        <q-breadcrumbs-el>
                            <q-btn-dropdown label="Rest API">
                                <q-list>
                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="Post List" icon="home"
                                                :to="{ name: 'posts-list' }" />
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="User Post List" icon="notes"
                                                :to="{ name: 'user-posts-list' }" />
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="User Favorite Post List" icon="notes"
                                                :to="{ name: 'user-favorite-posts-list' }" />
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="Search" icon="search" to="/search-posts" />
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="Add Post" icon="notes"
                                                :to="{ name: 'create-post' }" />
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="Tags List" icon="notes" to="/tags" />
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="Add Tag" icon="notes"
                                                :to="{ name: 'create-tag' }" />
                                        </q-item-section>
                                    </q-item>

                                </q-list>
                            </q-btn-dropdown>

                        </q-breadcrumbs-el>
                        <q-breadcrumbs-el>
                            <q-btn-dropdown label="GraphQL">
                                <q-list>
                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="GraphQL Post List" icon="notes"
                                                to="/graphql/posts-list/" />
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="User Post List" icon="notes"
                                                :to="{ name: 'graphql-user-posts-list' }" />
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="User Favorite Post List" icon="notes"
                                                :to="{ name: 'graphql-user-favorite-posts-list' }" />
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="GraphQL Search" icon="search"
                                                :to="{ name: 'graphql-search-posts' }" />
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="Add Post" icon="notes"
                                                :to="{ name: 'graphql-create-post' }" />
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="Tags List" icon="notes" to="/graphql/tags" />
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-breadcrumbs-el label="Add Tag" icon="notes"
                                                :to="{ name: 'graphql-create-tag' }" />
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-btn-dropdown>

                        </q-breadcrumbs-el>

                        <q-breadcrumbs-el label="About" icon="info" to="/about" />
                        <q-space />
                        <q-breadcrumbs-el label="Logout" icon="logout" @click="logout" to="/" />
                        <q-btn flat round :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'" @click="toggleTheme" />
                        <q-btn flat icon="menu" @click="toggleRightDrawer" />

                    </q-breadcrumbs>

                    <q-breadcrumbs v-else active-color="$q.dark.isActive > 'white' : 'dark'" style="font-size: 16px">
                        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
                        <q-breadcrumbs-el label="Home" icon="home" to="/" />
                        <q-breadcrumbs-el label="About" icon="info" to="/about" />
                        <q-space />
                        <q-breadcrumbs-el label="Login" icon="login" to="/login" />
                        <q-breadcrumbs-el label="Register" icon="person_add" to="/register" />
                        <q-btn flat round :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'" @click="toggleTheme" />
                        <q-btn flat icon="menu" @click="toggleRightDrawer" />
                    </q-breadcrumbs>


                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawer" :width="200" :breakpoint="700" side="left" bordered>
            <q-scroll-area class="fit">
                <q-list padding class="menu-list">
                    <q-item exact clickable v-ripple to="/">
                        <q-item-section avatar>
                            <q-icon name="home" />
                        </q-item-section>

                        <q-item-section>
                            Home
                        </q-item-section>
                    </q-item>

                    <q-item exact clickable v-ripple to="/about">
                        <q-item-section avatar>
                            <q-icon name="info" />
                        </q-item-section>

                        <q-item-section>
                            About
                        </q-item-section>

                    </q-item>

                    <q-item clickable v-ripple @click="toggleTheme">
                        <q-item-section avatar>
                            <q-icon name="dark_mode" />
                        </q-item-section>

                        <q-item-section>
                            Toggle Dark Mode
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-drawer v-if="authStore.$state.isAuthenticated" v-model="rightDrawer" :width="250" :breakpoint="700"
            side="right" bordered>
            <!-- drawer content -->
            <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                <q-list padding>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="inbox" />
                        </q-item-section>

                        <q-item-section>
                            <router-link :to="{ name: 'tags' }">
                                Tags List
                            </router-link>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="inbox" />
                        </q-item-section>

                        <q-item-section>
                            <router-link :to="{ name: 'create-post' }">
                                Add Post
                            </router-link>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="send" />
                        </q-item-section>

                        <q-item-section>
                            <router-link :to="{ name: 'create-tag' }">
                                RestAPI Add Tag
                            </router-link>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="inbox" />
                        </q-item-section>

                        <q-item-section>
                            <router-link :to="{ name: 'graphql-create-post' }">
                                GraphQL Add Post
                            </router-link>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="send" />
                        </q-item-section>

                        <q-item-section>
                            <router-link :to="{ name: 'graphql-posts-list' }">
                                GraphQL Post List
                            </router-link>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="send" />
                        </q-item-section>

                        <q-item-section>
                            <router-link :to="{ name: 'graphql-create-tag' }">
                                GraphQL Add Tag
                            </router-link>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="send" />
                        </q-item-section>

                        <q-item-section>
                            <router-link :to="{ name: 'user-posts-list' }">
                                RESTAPI User Post List
                            </router-link>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="send" />
                        </q-item-section>

                        <q-item-section>
                            <router-link :to="{ name: 'graphql-user-posts-list' }">
                                GraphQL User Post List
                            </router-link>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="send" />
                        </q-item-section>

                        <q-item-section>
                            <router-link :to="{ name: 'user-favorite-posts-list' }">
                                RESTAPI User Favorite Post List
                            </router-link>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="send" />
                        </q-item-section>

                        <q-item-section>
                            <router-link :to="{ name: 'graphql-user-favorite-posts-list' }">
                                GraphQL User Favorite Post List
                            </router-link>
                        </q-item-section>
                    </q-item>



                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="search" />
                        </q-item-section>

                        <q-item-section>
                            <router-link :to="{ name: 'search-posts' }">
                                REST API Search
                            </router-link>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="search" />
                        </q-item-section>

                        <q-item-section>
                            <router-link :to="{ name: 'graphql-search-posts' }">
                                GraphQL Search
                            </router-link>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple @click="logout">
                        <q-item-section avatar>
                            <q-icon name="logout" />
                        </q-item-section>

                        <q-item-section clickable>
                            Logout
                        </q-item-section>
                    </q-item>

                </q-list>
            </q-scroll-area>

            <div class="absolute-top" style="height: 150px">
                <div class="absolute-center bg-transparent">
                    <div class="text-weight-bold">Welcome, {{ username }}</div>
                </div>
            </div>
        </q-drawer>

        <q-drawer v-if="!authStore.$state.isAuthenticated" v-model="rightDrawer" :width="250" :breakpoint="700"
            side="right" bordered>
            <!-- drawer content -->
            <q-scroll-area style="height: calc(100% - 150px); border-right: 1px solid #ddd">
                <q-list padding>
                    <q-item clickable v-ripple to="/login">
                        <q-item-section avatar>
                            <q-icon name="login" />
                        </q-item-section>

                        <q-item-section>
                            Login
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple to="/register">
                        <q-item-section avatar>
                            <q-icon name="login" />
                        </q-item-section>

                        <q-item-section>
                            Register
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>


        <q-page-container>
            <router-view />
        </q-page-container>

    </q-layout>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { Dark, Notify } from 'quasar';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const username = ref(authStore.$state.username)
const router = useRouter();
const leftDrawer = ref(false);
const rightDrawer = ref(false);

function toggleLeftDrawer() {
    leftDrawer.value = !leftDrawer.value
}

function toggleRightDrawer() {
    rightDrawer.value = !rightDrawer.value
}


const darkMode = localStorage.getItem('darkMode') === 'true';
Dark.set(darkMode);

function toggleTheme() {
    Dark.toggle()
    localStorage.setItem('darkMode', Dark.isActive);
}

async function logout() {
    try {
        authStore.logout()
        router.push('/login')
        Notify.create({
            message: 'Logged out Successfully',
            type: "positive",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
    } catch (error) {
        Notify.create({
            message: error.message,
            type: "negative",
            actions: [
                { icon: 'close', color: 'white', round: true, }
            ]
        })
    }
}
</script>