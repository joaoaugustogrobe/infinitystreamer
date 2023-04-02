<template>
  <div
    class="max-w-sm h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full"
  >
    <RouterLink class="relative" :to="`/stream/${stream.id}`">

      <img class="rounded-t-lg w-full" src="https://t4.ftcdn.net/jpg/04/14/84/01/360_F_414840163_zuiXS6MoUduwiEWsuEe7kpsDKrhDaPYQ.jpg" alt="" />
      <span
      v-if="stream.live"
      class="absolute top-2 right-0 bg-red-100 text-red-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2"
      >
      LIVE {{ stream.watching }}
        <EyeIcon class="h-3 w-3 ml-1" />
      </span>
    </RouterLink>
    <div class="p-5">
      <RouterLink :to="`/stream/${stream.id}`">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
          {{ stream.title }}
        </h5>
      </RouterLink>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 h-12 overflow-hidden text-o">
        {{ stream.description }}
      </p>
      <div class="mb-3 truncate">
        <span
          v-for="(tag, index) in stream.tags"
          :key="index"
          class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2"
        >
          {{ tag }}
        </span>
      </div>
      <div class="flex justify-end">
        <a
          href="#"
          @click="editStream"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Manage
          <Cog6ToothIcon class="ml-2 h-6 w-6" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { EyeIcon } from '@heroicons/vue/24/solid'
import { defineProps } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()


const props = defineProps({
  stream: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        typeof value.title === 'string' &&
        typeof value.description === 'string' &&
        typeof value.live === 'boolean' &&
        typeof value.watching === 'number' &&
        Array.isArray(value.tags)
      )
    }
  }
})

function editStream(){
  router.push(`stream/${props.stream.id}`);
}
</script>