<template>
  <Drag
    class="truncate border rounded border-gray-700 box-border flex items-center gap-2 absolute h-full"
    :class="{
      'border-indigo-500': store.isTrackDecoded(track.id),
      'border-indigo-600': data.isDragging,
      'border-red-500': data.isColliding,
    }"
    :style="{ width: getTrackWidth(track), left: getTrackLeftPosition(track) }"
    @onDragStart="onDragStart"
    @onDragEnd="onDragEnd"
    @onDragMove="onDrag"
  >
    <img class="w-auto max-h-full rounded-l" :src="track.thumbnail" :alt="track.title" />
    <!-- <span class="truncate">{{ track.title }}</span> -->
    <span class="truncate">{{ data.dragDelta.x }}</span>
    <!-- Add waveform in background -->
  </Drag>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import { useStreamStore } from '../../stores'
import Drag from '../InteractJs/DraggableItem.vue'
import _ from 'lodash';

const store = useStreamStore()

const props = defineProps({
  track: Object,
  tracks: Array
})

const data = reactive({
  isDragging: false,
  isColliding: false,
  dragDelta: {
    x: 0,
    y: 0
  }
})

function getTrackWidth(track) {
  return `${track.duration}px`
}
function getTrackLeftPosition(track) {
  return `${track.timelineStartAt + data.dragDelta.x}px`
}
function onDragStart() {
  data.isDragging = true
  store.pauseReprodution()
}
function onDragEnd() {
  data.isDragging = false
}
function onDrag(event) {
  const deltaXAccumulated = data.dragDelta.x + event.delta.x;
  console.log(event.delta.x)
  const desiredPosition = {
    start: props.track.timelineStartAt + deltaXAccumulated,
    end: props.track.timelineStartAt + deltaXAccumulated + props.track.duration
  }

  data.isColliding = hasCollision(props.track, props.tracks, desiredPosition)
  data.dragDelta.x += event.delta.x
  data.dragDelta.y += event.delta.y
}

function hasCollision(track, tracks, desiredTrackPosition) {
  const selfIndex = _.findIndex(tracks, {id: track.id});
  if (selfIndex === -1) return false;

  const hasPreviousTrack = selfIndex >= 0;
  if (hasPreviousTrack) {
    const previousTrack = tracks[selfIndex - 1];
    const previousTrackPosition = {
      start: previousTrack.timelineStartAt,
      end: previousTrack.timelineStartAt + previousTrack.duration,
    }

    if (desiredTrackPosition.start < previousTrackPosition.end) {
      return true;
    }
  }
}
</script>

<style>
</style>