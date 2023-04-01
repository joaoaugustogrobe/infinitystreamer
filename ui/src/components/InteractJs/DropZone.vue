<template>
  <div ref="dropTarget">
    <slot></slot>
  </div>
</template>

<script setup>
import interact from 'interactjs'
import { onMounted, ref } from 'vue'

const dropTarget = ref(null);

onMounted(() => {
  console.log('dropTarget', dropTarget);
  interact(dropTarget)
    .dropzone({
      ondrop: function (event) {
        console.log('drop', event);
      }
    })
    .on('dropactivate', function (event) {
      event.target.classList.add('drop-activated')
    })
})
</script>