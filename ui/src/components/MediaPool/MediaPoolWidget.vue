<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 h-full overflow-auto">
    <div v-for="resource in trackTrends" :key="resource.id" class="relative group" @click="addTrack(resource)">
      <img class="h-auto max-w-full rounded-lg" :src="resource.thumbnail" :alt="resource.title">
      <div class="absolute top-2 right-2 bg-gray-900 rounded-full p-1 flex content-center">
        <MusicalNoteIcon class="h-4 w-4 text-white self-center" />
        <span class="box-border leading-4 text-sm w-0 group-hover:w-16 group-hover:px-1 transition-all duration-500 overflow-hidden">{{ formatTrackDuration(resource.duration) }}</span>
      </div>
      <div class="bg-gray-800 absolute bottom-0 inset-x-0 rounded-b px-2 py-1 opacity-90 truncate">
        <span class="text-white">{{ resource.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStreamStore } from '../../stores'
import { useRoute } from 'vue-router'
import { MusicalNoteIcon } from "@heroicons/vue/24/outline";
import moment from 'moment';



const store = useStreamStore()
const route = useRoute()
const streamId = route.params.id
store.fetchTrackTrends();

const stream = computed(() => store.getStreamById(streamId))
const trackTrends = computed(() => store.getTrackTrends)

const formatTrackDuration = (seconds) => {
  const duration = moment.duration(seconds, 'seconds');
  return moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
}

const addTrack = (track) => {
  console.log(`Adding '${track.title}' to '${stream.value.title}'`);
}

</script>

<style>
</style>