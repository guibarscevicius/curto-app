<template>
  <div class="article-list grid gap-2">
    <article-card
      v-for="({ id, caption, createdAt, image, logo, source, title })
        in article.listArticles()"
      :key="id"
      :caption="caption"
      :created-at="createdAt"
      :image="image"
      :logo="logo"
      :source="source"
      :title="title"
      @click="article.addSelected(id)"
    />
  </div>
</template>

<script>
import { onBeforeMount } from 'vue'

import useArticle from '~/modules/article'

export default {
  setup () {
    const article = useArticle()

    onBeforeMount(() => {
      article.fetchArticles()
    })

    return { article }
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
