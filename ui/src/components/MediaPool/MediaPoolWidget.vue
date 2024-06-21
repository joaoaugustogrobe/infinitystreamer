<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 h-full overflow-auto">
    <MediaPoolItem v-for="resource in trackTrends" :key="resource.id" class="relative group" :resource="resource"></MediaPoolItem>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStreamStore } from '../../stores'
import { useRoute } from 'vue-router'
import MediaPoolItem from './MediaPoolItem.vue';

const store = useStreamStore()
const route = useRoute()
const streamId = route.params.id

store.fetchTrackTrends();

const stream = computed(() => store.getStreamById(streamId))
const trackTrends = computed(() => store.getTrackTrends)

</script>