<template>
  <div class="grid grid-rows-6 grid-cols-12 grid-flow-col gap-4 h-full bg-black">
    <div class="row-span-4 col-span-5 bg-sky-100">
      Media Pool
    </div>
    <div class="bg-sky-500 row-span-4 col-span-7">
      Video display
    </div>
    <div class="bg-sky-900 row-span-2 col-span-12 col-start-1 row-start-5">
      Timelines
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const streams = reactive({
  id: 0,
  title: '10 Hour Study with Me: Productivity Music for Concentration & Focus!',
  description:
    'Need some study motivation? This 10-hour video will help you stay focused and productive while you study. Listen to our carefully curated playlist of classical music, ambient sounds, and instrumental beats.',
  live: false,
  watching: 2000,
  tags: ['study music', 'focus', 'productivity']
})
</script>

<style>
</style>