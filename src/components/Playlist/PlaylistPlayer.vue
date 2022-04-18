<template>
  <g-player
    :is-playing="isPlaying"
    :can-play="canPlay"
    :has-previous="article.hasPrevious()"
    :has-next="article.hasNext()"
    :source="article.getActive().audioUrl"
    :track-name="article.getActive().title"
    :source-name="article.getActive().source"
    @play="play"
    @pause="pause"
    @next="article.next"
    @previous="article.previous"
  />
</template>

<script>
import { ref } from 'vue'
import useArticle from '~/modules/article'

export default {
  setup () {
    const article = useArticle()

    const isPlaying = ref(false)
    const canPlay = ref(true)

    const play = () => { isPlaying.value = !isPlaying.value }
    const pause = () => { isPlaying.value = !isPlaying.value }

    return {
      article,
      isPlaying,
      play,
      pause,
      canPlay,
    }
  },

}
</script>
