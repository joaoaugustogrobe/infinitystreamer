<template>
  <div class="flex w-full h-16">
    <!-- Title -->
    <div class="bg-gray-800 flex items-center px-4 w-28">
      <span class="text-white">
        Audio {{ index }}
      </span>
      <SpeakerWaveIcon class="ml-1 h-4 w-4 text-white" />
    </div>
    <!-- Timeline Tracks -->
    <div class="bg-gray-900 grow overflow-auto flex flex-row flex-nowrap gap-0">
      <!-- <input id="audio_file" type="file" accept="audio/*" @change="onFileLoad"/> -->
      <!-- <audio id="audio_player" /> -->
      <div
        v-for="track in timeline.tracks" 
        class="truncate border rounded border-gray-700 box-border flex items-center gap-2"
        :class="{'border-indigo-500': store.isTrackDecoded(track.id)}"
        :style="{ width: `${track.duration}px`}" 
        :key="track.id"
      >
        <img class="w-auto max-h-full rounded-l" :src="track.thumbnail" :alt="track.title">
        <span class="truncate">{{ track.title }}</span>
        <!-- Add waveform in background -->
      </div>
      <div class="bg-blue-100">
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { SpeakerWaveIcon } from "@heroicons/vue/24/outline";
import { useStreamStore } from '../../stores'
const store = useStreamStore()


defineProps({
  timeline: Object,
  index: Number
})

</script>

<style>
</style>