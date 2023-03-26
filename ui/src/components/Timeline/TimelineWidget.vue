<template>
  <div class="w-full h-full">
    <div class="mb-0.5 pl-28">
      <TimeRuler />
    </div>
    <AudioTimeline
      v-for="(timeline, index) in audioTimelines"
      :key="timeline.id"
      :timeline="timeline"
      :index="index"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { computed } from 'vue'
import { useStreamStore } from '../../stores'
import { useRoute } from 'vue-router'
import AudioTimeline from './AudioTimeline.vue'
import TimeRuler from './TimeRuler.vue'

defineProps({
  streamId: String
})

const store = useStreamStore()
const route = useRoute()

const streamId = route.params.id
// const stream = computed(() => store.getStreamById(streamId))
const audioTimelines = computed(() => store.getAudioTimelinesByStream(streamId))
</script>
