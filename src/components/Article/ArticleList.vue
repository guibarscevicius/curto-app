<template>
  <div class="article-list grid gap-2">
    <article-card
      v-for="article in articles"
      :key="article._id"
      :image="article.media"
      logo="https://i.pinimg.com/originals/a0/db/2f/a0db2ff946b49086a105a2722db66d22.png"
      brand="The Guardian"
      :title="article.title"
      :description="article.description"
    />
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'

import useArticle from '~/modules/article'

export default {
  setup() {
    const article = useArticle()
    onBeforeMount(() => {
      article.fetchArticles()
    })

    return { articles: article.list }
  },
}
</script>

<style lang="scss">
.article-list {
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(32rem,1fr));
  }
}
</style>
