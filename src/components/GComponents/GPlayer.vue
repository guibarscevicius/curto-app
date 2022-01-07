<template>
  <div class="flex flex-row flex-nowrap justify-between">
    <div class="flex-grow-1">information</div>
    <div class="flex flex-row flex-nowrap space-x-0.5 items-center">
      <template v-for="{ component, size, onClick } in controllers" :key="component">
        <component
          :is="component"
          class="p-1 cursor-pointer"
          :height="size || '2.2em'"
          :width="size || '2.2em'"
          @click="onClick"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

import PreviousIcon from 'virtual:vite-icons/fluent/previous-24-regular'
import NextIcon from 'virtual:vite-icons/fluent/next-24-regular'
import PlayIcon from 'virtual:vite-icons/fluent/play-24-regular'
import PauseIcon from 'virtual:vite-icons/fluent/pause-24-regular'

export default {
  props: {
    isPlaying: {
      type: Boolean,
      default: false,
    },
    hasPrevious: {
      type: Boolean,
      default: false,
    },
    hasNext: {
      type: Boolean,
      default: false,
    },
    canPlay: {
      type: Boolean,
      default: false,
    },
  },

  setup (props, { emit }) {
    const controllers = computed(() => [
      {
        component: PreviousIcon,
        disabled: !props.hasPrevious,
        onClick: () => props.hasPrevious && emit('previous'),
        size: '1.6em',
      },
      props.isPlaying
        ? {
          component: PlayIcon,
          active: props.canPlay,
          onClick: () => props.canPlay && emit('play'),
        }
        : {
          component: PauseIcon,
          onClick: () => emit('pause'),
        },
      {
        component: NextIcon,
        disabled: !props.hasNext,
        onClick: () => props.hasNext && emit('next'),
        size: '1.6em',
      },
    ])

    return { ...props, controllers }
  },
}
</script>
