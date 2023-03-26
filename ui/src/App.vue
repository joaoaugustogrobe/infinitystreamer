<template>
  <div class="h-screen flex flex-col">
    <Navbar />
    <RouterView class="grow"/>
  </div>
</template>
<script setup>
import Navbar from './components/Navbar.vue';

</script>