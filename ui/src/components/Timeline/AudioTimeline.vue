<template>
  <div class="flex w-full h-16">
    <!-- Title -->
    <div class="bg-gray-800 flex items-center px-4 w-28" @click="init">
      <span class="text-white">
        Audio {{ index }}
      </span>
      <SpeakerWaveIcon class="ml-1 h-4 w-4 text-white" />
    </div>
    <!-- Timeline Tracks -->
    <div class="bg-gray-900 grow overflow-auto flex flex-row flex-nowrap gap-0">
      <!-- <input id="audio_file" type="file" accept="audio/*" @change="onFileLoad"/> -->
      <!-- <audio id="audio_player" /> -->
      <div class="truncate border rounded border-gray-700 box-border flex items-center gap-2" :style="{ width: `${track.duration}px`}" v-for="track in timeline.tracks" :key="track.id">
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
import { defineProps, onMounted, reactive } from 'vue'
import { SpeakerWaveIcon } from "@heroicons/vue/24/outline";
import { useStreamStore } from '../../stores'
const store = useStreamStore()


const props = defineProps({
  timeline: Object,
  index: Number
})

// onMounted(() => {
  // mountAudioTimeline();
// })

const data = reactive({
  audioObjects: [],
  audioContext: new AudioContext(),
  arrayBuffer: null,
});

data.audioContext.suspend();

const initiateTrack = async (arrayBuffer, startAt) => {
  const source = data.audioContext.createBufferSource();
  console.log(arrayBuffer);
  const audioBuffer = await data.audioContext.decodeAudioData(arrayBuffer);
  source.buffer = audioBuffer;
  source.connect(data.audioContext.destination);
  source.addEventListener('ended', () => {
    console.log('Source has ended');
  });
  source.start(startAt);
}

const init = async () => {
  const res = await store.fetchTrackArrayBuffer(props.timeline.tracks[0].resourceUrl);
  console.log(res);
  const arrayBuffer = res.data;
  initiateTrack(arrayBuffer, 0);
  data.audioContext.resume();

  setInterval(() => {
    store.setPlayhead(data.audioContext.currentTime);
  }, 32); // 30 fps
}

// const play = async () => {
//   const tracks = props.timeline.tracks;
//   for(let i = 0; i < tracks.length; i++) {
//     const track = tracks[i];
//     let res = await store.fetchTrackArrayBuffer(track.resourceUrl);
//     console.log(res);
//     const arrayBuffer = res.data;
//     initiateTrack(arrayBuffer, track.timelineStartAt);
//   }
// }


</script>

<style>
</style>