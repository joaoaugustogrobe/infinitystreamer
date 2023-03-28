<template>
  <div class="h-screen flex flex-col">
    <Navbar />
    <RouterView class="flex-1 overflow-y-auto "/>
  </div>
</template>
<script setup>
import Navbar from './components/Navbar.vue';
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStreamStore } from './stores'

const route = useRoute()
const store = useStreamStore()

store.setCurrentStreamId(route.params.id);

watch(
  () => route.params.id,
  async newId => {
    if (newId) {
      store.setCurrentStreamId(newId)
    } else {
      store.setCurrentStreamId(null)
    }
  }
)

</script>