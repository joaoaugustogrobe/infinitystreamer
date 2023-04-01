<template>
  <div ref="dragTarget">
    <slot></slot>
  </div>
</template>

<script setup>
import interact from 'interactjs'
import { onMounted, ref, defineEmits } from 'vue'

const dragTarget = ref(null);
const emit = defineEmits(['onDragStart', 'onDragEnd', 'onDragMove'])

onMounted(() => {
  interact(dragTarget.value).draggable({
    listeners: {
      start (event) {
        emit('onDragStart', event);
      },
      end(event) {
        emit('onDragEnd', event);
      },
      move (event) {
        emit('onDragMove', event);
      },
    },
  })
})
</script>