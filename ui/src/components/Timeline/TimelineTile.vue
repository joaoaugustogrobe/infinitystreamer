<template>
  <div class="w-full h-full">
    <AudioTimeline v-for="(timeline, index) in audioTimelines" :key="timeline.id" :timeline="timeline" :index="index"/>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { computed } from 'vue'
import { useStreamStore } from '../../stores';
import { useRoute } from 'vue-router';
import AudioTimeline from './AudioTimeline.vue';

defineProps({
  streamId: String,
})


const store = useStreamStore()
const route = useRoute();

const streamId = route.params.id;
store.fetchStream(streamId);
// const stream = computed(() => store.getStreamById(streamId))
const audioTimelines = computed(() => store.getAudioTimelinesByStream(streamId))

</script>
