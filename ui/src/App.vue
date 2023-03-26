<template>
  <div class="h-screen flex flex-col">
    <Navbar />
    <RouterView class="flex-1 overflow-y-auto "/>
  </div>
</template>
<script setup>
import Navbar from './components/Navbar.vue';

</script>