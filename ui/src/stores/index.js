import { defineStore } from 'pinia'
import InfinityStreamer from '../infinitystreamer/client/index'

export const useStreamStore = defineStore('stream', {
  state: () => ({
    streams: [], // List of streams by GET/stream/all
    streamMap: {}, // map streamid full object from GET/stream/:id
    client: new InfinityStreamer(),
    trackTrends: [],
    currentStreamId: null,
    playhead: 0,
    playing: false,
    audioContext: null,
    audioSource: null,
  }),
  getters: {
    getStreams: (state) => state.streams,
    getTrackTrends: (state) => state.trackTrends,
    getStreamById: (state) => {
      return (streamId) => state.streamMap[streamId] || {}
    },
    getAudioTimelinesByStream: (state) => {
      return (streamId) => state.streamMap[streamId]?.audioTimelines || []
    },
    getPlayhead: (state) => state.playhead,
    isPlaying: (state) => state.playing,
    getStream: (state) => state.streamMap[state.currentStreamId] || {}
  },
  actions: {
    setCurrentStreamId(id) {
      this.currentStreamId = id;
    },
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
      } else {
        delete this.streamMap.id;
      }
    },
    async fetchTrackTrends() {
      const res = await this.client.get('track/trends');
      if(res.ok) {
        Object.assign(this.trackTrends, res.data)
      } else {
        delete this.streamMap.id;
      }
    },
    async addTrackToTimeline(trackId, timelineId, streamId) {
      const res = await this.client.post(`timeline/${timelineId}/add-track`, {
        trackId
      });
      if (res.ok) {
        await this.fetchStream(streamId);
      }
      return res;
    },
    async fetchTrackArrayBuffer(url) {
      return this.client.get('track', { url }, { responseType: 'arraybuffer' });
    },
    setPlayhead(time) {
      this.playhead = time;
    },
    async resumeReprodution() {
      if (!this.audioContext || this.audioBuffer) {
        this.initAudioContext();
        await this.initTimeline();
      }
      this.audioContext.resume();
      this.playing = true;
    },
    pauseReprodution() {
      this.playing = false;
      this.audioContext.suspend();
      // handle audioContext
    },
    async initTimeline() {
      const { tracks } = this.getStream.audioTimelines[0];
      await this.pushTrackToContext(tracks[0]); // fetch the first one to unblock the stream and return
      for(let i = 1; i < tracks.length; i++) {
        this.pushTrackToContext(tracks[i]); // add it to a queue
      }
    },
    initAudioContext() {
      this.audioContext = new AudioContext();
      this.audioContext.suspend();

      setInterval(() => {
        console.log(this.audioContext.currentTime);
        this.setPlayhead(this.audioContext.currentTime);
      }, 32); // 30 fps
    },
    async pushTrackToContext(track) {
      // Assert that we have an audioContext
      if (!this.audioContext || this.audioBuffer) this.initAudioContext();

      // Request track binary
      const res = await this.fetchTrackArrayBuffer(track.resourceUrl);
      if (!res.ok) {
        //handle error
        console.log('failed to fetch track', res);
        return;
      }
      const audioSource = this.audioContext.createBufferSource();
      const audioBuffer = await this.audioContext.decodeAudioData(res.data);
      audioSource.buffer = audioBuffer;
      audioSource.connect(this.audioContext.destination);
      audioSource.start(track.timelineStartAt);
    }
  },
})
