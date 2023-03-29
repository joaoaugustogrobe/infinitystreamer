import { defineStore } from 'pinia'
import InfinityStreamer from '../infinitystreamer/client/index'
import { getRemainingTracks, getTrackInitAndOffset } from '../utils/timeline';
import { priorityQueue, parallel } from 'async';

export const useStreamStore = defineStore('stream', {
  state: () => ({
    streams: [], // List of streams by GET/stream/all
    streamMap: {}, // map streamid full object from GET/stream/:id
    client: new InfinityStreamer(),
    trackTrends: [],
    currentStreamId: null,
    audioContextPlayhead: 0,
    playheadOffset: 0, // Offset from start of stream (When user starts from somewhere else)
    playing: false,
    audioContext: null,
    trackArrayBuffer: {}, // by id - We need to manage memory really well for this
    trackSourceLoadedMap: {},
    trackFetchQueue: null,
    minBufferSize: 30, // App will load chuncks of at least 30 seconds
    bufferCheckInterval: 5, // TODO - Interval for checking if current buffer size is long enough
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
    getPlayhead: (state) => state.audioContextPlayhead + state.playheadOffset,
    isPlaying: (state) => state.playing,
    getStream: (state) => state.streamMap[state.currentStreamId] || {},
    getTrackArrayBuffer: (state) => {
      return (trackId) => state.trackArrayBuffer[trackId] || null;
    },
    isTrackDecoded: (state) => {
      return (trackId) => !!state.trackArrayBuffer[trackId];
    },
    isTrackSourceLoaded: (state) => {
      return (trackId) => !!state.trackSourceLoadedMap[trackId];
    }
  },
  actions: {
    // init() {
    //   this.trackFetchQueue = priorityQueue(function(task, callback) {
    //     callback();
    //   }, 2); //can fetch up to two tracks in parallel
    // },
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
    async fetchTrackArrayBuffer(track, force = false) {
      if (!this.getTrackArrayBuffer(track.id) || force) {
        const res = await this.client.get('track', 
          { url: track.resourceUrl },
          { responseType: 'arraybuffer' }
        );
        if (!res.ok) {
          console.log('failed to fetch track', res);
          delete this.trackArrayBuffer[track.id];
          return;
        }
        Object.assign(this.trackArrayBuffer, {[track.id]: res.data})
      }
    },
    setPlayhead(time) {
      this.audioContextPlayhead = time;
    },
    async resumeReprodution() {
      if (!this.audioContext) { // first time playing
        await this.loadAudioContext();
        await this.loadBufferChunck();
      }
      this.audioContext.resume();
      this.playing = true;
    },
    pauseReprodution() {
      this.playing = false;
      this.audioContext.suspend();
      // handle audioContext
    },
    async loadAudioContext() {
      if (!this.audioContext) {
        setInterval(() => {
          if (this.audioContext?.currentTime !== this.audioContextPlayhead) {
            this.setPlayhead(this.audioContext?.currentTime || 0);
          }
        }, 1000);

        setInterval(() => {
          this.loadBufferChunck();
        }, this.bufferCheckInterval * 1000);
      }
      if (this.audioContext) {
        this.audioContext.suspend();
        await this.audioContext.close();
        Object.assign(this.trackSourceLoadedMap, {});
      }
      this.audioContext = new AudioContext();
      this.audioContext.suspend();
    },
    async loadBufferChunck() {
      console.log('loadBufferChunck');
      // await this.loadAudioContext();

      const allTracks = this.getStream.audioTimelines[0].tracks;
      const playhead = this.getPlayhead;
      let tracks = getRemainingTracks(allTracks, playhead);
      tracks = tracks.map(track => {
        const { start, offset } = getTrackInitAndOffset(track, this.playheadOffset)
        return {
          ...track,
          _start: start,
          _offset: offset,
        }
      });
      let tracksToBuffer = tracks.filter((track) =>  + track._start < this.minBufferSize + this.audioContextPlayhead)
      // console.log('buffering until', this.playhead + track._start);
      console.log('tracksToBuffer', tracksToBuffer);
      const trackFetchQueue = priorityQueue(async (task, callback) => {
        await task();
        callback(true);
      }, 2);

      for(let i = 0; i < tracksToBuffer.length; i++) {
        // Index works as a priority. This will make the first track to be downloaded first
        trackFetchQueue.push(async () => {
          await this.fetchTrackArrayBuffer(tracksToBuffer[i]);
        }, i);
      }

      await trackFetchQueue.drain();

      // Ignore tracks already loaded
      const tracksToLoad = tracksToBuffer.filter(track => !this.isTrackSourceLoaded(track.id));

      await parallel(tracksToLoad.map(track => {
        return async () => await this.pushTrackToContext(track, track._start, track._offset);
      }));
    },
    async pushTrackToContext(track, trackInit = 0, trackOffset = 0) {
      // Assert that we have an audioContext
      if (!this.audioContext) await this.loadAudioContext();

      const arraybuffer = this.getTrackArrayBuffer(track.id);
      if (!arraybuffer) {
        console.log('handle error');
        return;
      }

      const audioSource = this.audioContext.createBufferSource();
      const audioBuffer = await this.audioContext.decodeAudioData(arraybuffer.slice(0));
      audioSource.buffer = audioBuffer;
      audioSource.connect(this.audioContext.destination);
      Object.assign(this.trackSourceLoadedMap, {[track.id]: true});

      audioSource.start(trackInit, trackOffset);
    },
    async movePlayhead(to) {
      this.setPlayheadOffset(to);

      await this.loadAudioContext();
      await this.loadBufferChunck();
      if (this.playing) {
        this.audioContext.resume();
      }
    },
    setPlayheadOffset(to) {
      this.playheadOffset = to;
    }
  },
})
