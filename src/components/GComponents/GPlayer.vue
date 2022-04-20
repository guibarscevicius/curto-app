<template>
  <div class="flex flex-col flex-nowrap justify-between text-xs">
    <div class="flex-grow-1 pb-2">
      <p class="line-clamp-1 font-bold">
        {{ trackName }}
      </p>
      <p class="line-clamp-1">
        {{ sourceName }}
      </p>
    </div>

    <GAudio
      ref="audio"
      v-bind="attrs"
      :source="source"
      :type="type"
    />

    <div class="flex flex-row flex-nowrap space-x-0.5 items-center justify-center text-base">
      <template v-for="{ component, size, onClick } in controllers" :key="component">
        <component
          :is="component"
          class="p-1 cursor-pointer"
          :height="size || '2.4em'"
          :width="size || '2.4em'"
          @click="onClick"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

import PreviousIcon from 'virtual:vite-icons/fluent/previous-24-regular'
import NextIcon from 'virtual:vite-icons/fluent/next-24-regular'
import PlayIcon from 'virtual:vite-icons/fluent/play-24-regular'
import PauseIcon from 'virtual:vite-icons/fluent/pause-24-regular'

export default {
  props: {
    source: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'audio/mp3',
    },
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
    trackName: {
      type: String,
      default: '',
    },
    sourceName: {
      type: String,
      default: '',
    },
  },

  emits: ['previous', 'pause', 'play', 'next'],

  setup (props, { emit, attrs }) {
    const audio = ref(null)

    const play = () => {
      props.canPlay && emit('play')
      audio.value.play()
    }

    const pause = () => {
      emit('pause')
      audio.value.pause()
    }

    const controllers = computed(() => [
      {
        component: PreviousIcon,
        disabled: !props.hasPrevious,
        onClick: () => {
          if (props.hasPrevious) {
            pause()
            emit('previous')
          }
        },
        size: '1.6em',
      },
      props.isPlaying
        ? {
          component: PauseIcon,
          onClick: pause,
        }
        : {
          component: PlayIcon,
          active: props.canPlay,
          onClick: play,
        },
      {
        component: NextIcon,
        disabled: !props.hasNext,
        onClick: () => {
          if (props.hasNext) {
            pause()
            emit('next')
          }
        },
        size: '1.6em',
      },
    ])

    return { ...props, controllers, attrs, audio }
  },
}
</script>
