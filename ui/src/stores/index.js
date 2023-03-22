import { defineStore } from 'pinia'
import InfinityStreamer from '../infinitystreamer/client/index'

export const useStreamStore = defineStore('stream', {
  state: () => ({
    streams: [],
    client: new InfinityStreamer(),
  }),
  getters: {
    getStreams: (state) => state.streams,
  },
  actions: {
    async fetchStreams() {
      console.log('getStreams action');
      const res = await this.client.get('stream/all', {take: 30, skip: 0});
      if(res.ok) {
        this.streams = res.data.data;
      } else {
        this.streams = [];
      }
    },
    increment() {
      this.count++
    },
  },
})
