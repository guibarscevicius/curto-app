<template>
  <div class="block">
    <audio
      :key="source"
      ref="audio"
      class="hidden"
      controls
      v-bind="attrs"
      @loadstart="startLoading"
      @canplay="finishLoading"
      @canplaythrough="finishLoading"
      @timeupdate="updateProgress"
      @loadeddata="updateBuffer"
    >
      <source :src="source" :type="type" @error="handleError">
    </audio>

    <div class="flex flex-col flex-nowrap">
      <g-range
        :value="progress"
        :buffered="buffer"
        @change="browse"
        @input="browse"
      />

      <div class="flex flex-row flex-nowrap justify-between">
        <span class="current">{{ currentProgress }}</span>
        <span class="duration">{{ duration }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'


function secondToTime(d = 0) {
  const formatNumber = n => n < 10 ? '0' + n : n

  const hours = Math.floor(d / 3600)
  const minutes = Math.floor((d % 3600) / 60)
  const seconds = Math.floor(d % 60)

  return (hours ? hours + ':' : '')
    + (hours ? formatNumber(minutes) : minutes) + ':'
    + formatNumber(seconds)
}

export default {
  name: 'GAudio',

  props: {
    source: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'audio/mp3',
    },
  },

  setup(props, { attrs, emit }) {
    const audio = ref(null)

    const currentTime = ref(0)
    const totalTime = ref(0)
    const buffer = ref(0)
    const isPaused = ref(true)
    const localLoading = ref(false)
    const disabled = ref(false)

    const duration = computed(() => secondToTime(totalTime.value))
    const currentProgress = computed(() => secondToTime(currentTime.value))
    const progress = computed(() => (100 * currentTime.value / totalTime.value) || 0)

    function play() {
      audio.value.play()
      isPaused.value = false
    }

    function pause() {
      audio.value.pause()
      isPaused.value = true
    }

    function startLoading() {
      localLoading.value = true
      disabled.value = false
    }

    function finishLoading({ target: { duration } = {} }) {
      localLoading.value = false
      disabled.value = false
      totalTime.value = duration
    }

    function updateProgress({ target: { currentTime: c } = {} }) {
      currentTime.value = c
      updateBuffer()
    }

    function updateBuffer() {
      if (!audio.value.buffered.length) return

      buffer.value = audio.value.buffered
        .end(audio.value.buffered.length - 1) * 100 / (totalTime.value || 1)
    }

    function browse({ target: { value } = {} }) {
      audio
      audio.value.currentTime = totalTime.value  * value * .01
    }

    function handleError() {
      disabled.value = true
      localLoading.value = false
      emit('error')
    }

    return {
      ...props,
      attrs,
      play,
      pause,
      isPaused,
      progress,
      currentTime,
      duration,
      audio,
      browse,
      buffer,
      disabled,
      localLoading,
      startLoading,
      finishLoading,
      updateProgress,
      currentProgress,
      updateBuffer,
      emit,
      handleError,
    }
  },
}
</script>
