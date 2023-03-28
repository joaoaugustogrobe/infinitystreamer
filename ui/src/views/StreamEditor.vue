<template>
  <div class="grid grid-rows-6 grid-cols-12 grid-flow-col gap-4 h-full bg-gray-900 p-2">
    <div class="row-span-4 col-span-5 bg-gray-900 border rounded border-gray-800">
      <MediaPoolWidget :stream-id="stream.id" />
    </div>
    <div class="row-span-4 col-span-7 bg-gray-900 border rounded border-gray-800">
      <MediaDisplayWidget :stream-id="stream.id" />
    </div>
    <div class="row-span-2 col-span-12 col-start-1 row-start-5 bg-gray-900 border rounded border-gray-800">
      <TimelineWidget :stream-id="stream.id" />
    </div>
  </div>
</template>

<script setup>
import TimelineWidget from '../components/Timeline/TimelineWidget.vue';
import MediaPoolWidget from '../components/MediaPool/MediaPoolWidget.vue';
import MediaDisplayWidget from '../components/MediaDisplay/MediaDisplayWidget.vue';
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