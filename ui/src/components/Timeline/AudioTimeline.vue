<template>
  <div class="flex w-full h-16">
    <!-- Title -->
    <div class="bg-gray-800 flex items-center px-4 w-28">
      <span class="text-white"> Audio {{ index }} </span>
      <SpeakerWaveIcon class="ml-1 h-4 w-4 text-white" />
    </div>
    <!-- Timeline Tracks -->
    <div class="bg-gray-900 grow overflow-auto flex flex-row flex-nowrap gap-0 relative">
      <!-- <input id="audio_file" type="file" accept="audio/*" @change="onFileLoad"/> -->
      <!-- <audio id="audio_player" /> -->
      <Track v-for="track in timeline.tracks" :key="track.id" :track="track" :tracks="timeline.tracks"/>

      <div class="bg-blue-100"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { SpeakerWaveIcon } from '@heroicons/vue/24/outline'
import { useStreamStore } from '../../stores'
// import Drop from '../InteractJs/DropZone.vue';
import Track from './TrackItem.vue';
const store = useStreamStore()

defineProps({
  timeline: Object,
  index: Number
})
</script>

<style>
</style>