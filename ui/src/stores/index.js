import { defineStore } from 'pinia'
import InfinityStreamer from '../infinitystreamer/client/index'

export const useStreamStore = defineStore('stream', {
  state: () => ({
    streams: [], // List of streams by GET/stream/all
    streamMap: {}, // map streamid full object from GET/stream/:id
    client: new InfinityStreamer(),
  }),
  getters: {
    getStreams: (state) => state.streams,
    getStreamById: (state) => {
      return (streamId) => state.streamMap[streamId] || {}
    },
    getAudioTimelinesByStream: (state) => {
      return (streamId) => state.streamMap[streamId]?.audioTimelines || []
    },
  },
  actions: {
    async fetchStreams() {
      const res = await this.client.get('stream/all', {take: 30, skip: 0});
      if(res.ok) {
        this.streams = res.data.data;
      } else {
        this.streams = [];
      }
    },
    async fetchStream(id) {
      const res = await this.client.get(`stream/${id}`);
      if(res.ok) {
        Object.assign(this.streamMap, {[id]: res.data})
        // this.streamMap[id] = res.data;
      } else {
        delete this.streamMap.id;
      }
    },
    increment() {
      this.count++
    },
  },
})
