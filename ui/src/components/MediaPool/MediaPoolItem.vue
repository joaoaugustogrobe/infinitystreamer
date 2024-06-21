<template>
  <div class="relative group" @click="addTrack(resource)" @mouseenter="playTrack" @mouseleave="pauseTrack">
    <img class="h-auto max-w-full rounded-lg" :src="resource.thumbnail" :alt="resource.title">
    <audio ref="audioPlayer" :src="resource.resourceUrl">a</audio>
    <div class="absolute top-2 right-2 bg-gray-900 rounded-full p-1 flex content-center">
      <MusicalNoteIcon class="h-4 w-4 text-white self-center" />
      <span
        class="box-border leading-4 text-sm w-0 group-hover:w-16 group-hover:px-1 transition-all duration-500 overflow-hidden">{{
    formatTrackDuration(resource.duration) }}</span>
    </div>
    <div class="bg-gray-800 absolute bottom-0 inset-x-0 rounded-b px-2 py-1 opacity-90 truncate">
      <span class="text-white">{{ resource.title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStreamStore } from '../../stores'
import { useRoute } from 'vue-router'
import { computed, defineProps, ref } from 'vue'
import moment from 'moment';

import { MusicalNoteIcon } from "@heroicons/vue/24/outline";

defineProps({
  resource: {
    type: Object,
    required: true
  }
});

const audioPlayer = ref<HTMLAudioElement | null>(null);
const route = useRoute()
const store = useStreamStore()
const streamId = route.params.id

const stream = computed(() => store.getStreamById(streamId))

const formatTrackDuration = (seconds) => {
  const duration = moment.duration(seconds, 'seconds');
  return moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
}

const addTrack = (track) => {
  console.log(`Adding '${track.title}' to '${stream.value.title}'`);
  const timeline = store.getAudioTimelinesByStream(streamId)[0];
  const res = store.addTrackToTimeline(track.id, timeline.id, stream.value.id);
}

const playTrack = () => {
  if (!audioPlayer.value) return;
  audioPlayer.value.play();
}
const pauseTrack = () => {
  if (!audioPlayer.value) return;
  audioPlayer.value.pause();
}

</script>

<style scoped></style>