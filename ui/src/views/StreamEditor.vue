<template>
  <div class="grid grid-rows-6 grid-cols-12 grid-flow-col gap-4 h-full bg-gray-900 p-2">
    <div class="row-span-4 col-span-5 bg-gray-900 border rounded border-gray-800">
      Media Pool
    </div>
    <div class="row-span-4 col-span-7 bg-gray-900 border rounded border-gray-800">
      Video display
    </div>
    <div class="row-span-2 col-span-12 col-start-1 row-start-5 bg-gray-900 border rounded border-gray-800">
      <TimelineTile :stream-id="stream.id" />
    </div>
  </div>
</template>

<script setup>
import TimelineTile from '../components/Timeline/TimelineTile.vue';
import { computed } from 'vue'
import { useStreamStore } from '../stores';
import { useRoute } from 'vue-router';

const store = useStreamStore()
const route = useRoute();

const streamId = route.params.id;
store.fetchStream(streamId);
const stream = computed(() => store.getStreamById(streamId))


</script>

<style>
</style>