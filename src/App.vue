<script setup>
import AppNavbar from './components/AppNavbar.vue'
import NavigationButton from './components/NavigationButton.vue'
</script>

<template>
  <AppNavbar />
  <router-view />
  <NavigationButton />
</template>

<style scoped></style>
