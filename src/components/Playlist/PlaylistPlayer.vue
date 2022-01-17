<template>
  <g-player
    :is-playing="isPlaying"
    :can-play="canPlay"
    :has-previous="hasPrevious"
    :has-next="hasNext"
    source="http://localhost:1337/articles/61703c3a8c6f791b9ce4ca30"
    @play="play"
    @pause="pause"
    @next="next"
    @previous="previous"
  />
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const isPlaying = ref(false)
    const hasPrevious = ref(false)
    const hasNext = ref(false)
    const canPlay = ref(true)

    const play = () => { isPlaying.value = !isPlaying.value }
    const pause = () => { isPlaying.value = !isPlaying.value }
    const previous = () => { console.log('previous') }
    const next = () => { console.log('next') }

    return {
      isPlaying,
      play,
      pause,
      previous,
      next,
      hasPrevious,
      hasNext,
      canPlay,
    }
  },

}
</script>
