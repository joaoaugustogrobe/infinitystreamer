<template>
  <div class="flex w-full h-16">
    <!-- Title -->
    <div class="bg-gray-800 flex items-center px-4">
      <span class="text-white">
        Audio {{ index }}
      </span>
      <SpeakerWaveIcon class="ml-1 h-4 w-4 text-white" />
    </div>
    <!-- Timeline Tracks -->
    <div class="bg-gray-900 grow overflow-auto flex flex-row flex-nowrap gap-0 pl-0.5">
      <div class="truncate border rounded border-gray-700" :style="{ width: `${track.duration * timelineScale}px`}" v-for="(track, trackIndex) in timeline.tracks" :key="track.id">
        <span class="">{{ track.title }}</span>
        <!-- Add waveform in background -->
      </div>
      <div class="bg-blue-100">

      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { SpeakerWaveIcon } from "@heroicons/vue/24/outline";


defineProps({
  timeline: Object,
  index: Number
})

const timelineScale = computed(() => 3);

</script>

<style>
</style>