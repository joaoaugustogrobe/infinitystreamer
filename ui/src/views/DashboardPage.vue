<template>
  <div class="container mx-auto py-4 flex flex-wrap gap-2 justify-center">
    <StreamCard v-for="(stream, index) in store.getStreams" :key="index" :stream="stream" />
  </div>
</template>

<script setup>
import StreamCard from '../components/StreamCard.vue';
import { reactive } from 'vue'
import { useStreamStore } from '../stores/index';
import { mapState } from 'pinia'


const store = useStreamStore()

store.fetchStreams();
</script>