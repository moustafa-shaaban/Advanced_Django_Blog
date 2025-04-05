<script setup>

definePageMeta({
    layout: 'default',
    requireAuth: true,
    middleware: "auth",
    name: "restAPIIndexPage"
})

</script>

<template>
    <q-page class="q-mt-sm flex flex-center">
        <h4>
            Welcome to the RESTAPI implmentation in Nuxt Frontend
        </h4>
    </q-page>
</template>
