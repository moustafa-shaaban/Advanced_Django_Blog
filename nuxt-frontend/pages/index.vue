<script setup lang="ts">
definePageMeta({
    layout: 'default',
    requireAuth: false,
    middleware: "auth",
    name: "homePage"
})
</script>

<template>
    <section>
        <p>This page will be displayed at the / route.</p>
    </section>
</template>