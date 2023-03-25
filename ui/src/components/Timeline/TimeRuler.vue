<template>
  <div class="timeline">
    <div class="flex h-6" ref="timelineElement">
      <span v-for="tick in ticks" :key="tick" class="tick" :data-key="tick" :data-time="(getTickTimestamp(tick))" 
        :style="{ left: getTickLeftPosition(tick) }"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, defineProps } from 'vue'
import moment from 'moment';
const timelineElement = ref(null)

const props = defineProps({
  tickResolution: {
    type: Number,
    default: () => 10, // in seconds
  }
});

onMounted(() => {
  data.width = timelineElement.value.clientWidth
})

const data = reactive({
  width: 0,
});

const requiredTicks = computed(() => Math.floor(data.width / props.tickResolution));
const ticks = computed(() => Array.from({length: requiredTicks.value}, (_, i) => i));

const getTickTimestamp = (tickIndex) => {
  const tickNumber = tickIndex + 1;
  const seconds = tickNumber * props.tickResolution;
  // return seconds;
  const duration = moment.duration(seconds, 'seconds');
  return moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
}
const getTickLeftPosition = (tickIndex) => {
  const tickNumber = tickIndex + 1;
  return `${tickNumber * 10}px`
}

</script>

<style lang="scss" scoped>

$line-height: 20px;
.timeline {
  counter-reset: tick-counter;
  padding-top: $line-height;
  .tick {
    box-sizing: border-box;
    width: 0px;
    height: 50%;
    border-left: 1px solid var(--lt-color-gray-700);
    text-align: center;
    position: absolute;
  }
  :nth-child(6n) {
    height: 70%;
    border-left: 1px solid var(--lt-color-gray-600);
    &::before {
      content: attr(data-time);
      display: block;
      height: auto;
      width: 50px;
      position: absolute;
      top: -$line-height;
      right: -25px;
      font-size: 11px;
    }
  }
}
</style>