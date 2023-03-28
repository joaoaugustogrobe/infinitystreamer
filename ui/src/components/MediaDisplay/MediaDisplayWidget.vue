<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex-1"></div>
    <div class="inline-flex rounded-md shadow-sm self-center py-4" role="group">
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 cursor-default"
      >
        <BackwardIcon class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-100"/>
      </button>
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 cursor-default"
      >
      <PauseIcon v-if="isPlaying" @click="pauseReprodution()" class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-100"/>
      <PlayIcon v-else @click="resumeReprodution()" class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-100"/>
      </button>
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 cursor-default"
      >
        <ForwardIcon class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-100"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { computed } from 'vue'
import { useStreamStore } from '../../stores'
import { useRoute } from 'vue-router'

import { PlayIcon, ForwardIcon, BackwardIcon, PauseIcon } from '@heroicons/vue/24/solid'

defineProps({
  streamId: String
})

const store = useStreamStore()
const route = useRoute()

const streamId = route.params.id
const stream = computed(() => store.getStreamById(streamId))

const isPlaying = computed(() => store.isPlaying);
const { resumeReprodution, pauseReprodution } = store;

</script>
