<script setup>
definePageMeta({
    layout: 'default',
    requireAuth: false,
    middleware: "auth",
})
</script>
<template>
    <section>
        <p>This page will be displayed at the /about route.</p>
    </section>
</template>