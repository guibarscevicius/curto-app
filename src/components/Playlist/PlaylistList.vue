<template>
  <div class="flex flex-col w-full h-full space-y-2">
    <g-empty v-if="!article.selected.value.length">
      <p class="text-xl font-semibold">
        Ouch...
      </p>
      <p>
        Você ainda não adicionou itens à sua lista!<br />
        Clique em algum dos artigos para continuar
      </p>
      <p v-if="isMobile">Batata</p>
    </g-empty>

    <template v-else>
      <playlist-card
        v-for="({ id, caption, createdAt, image, logo, source, title })
          in article.listSelected()"
        :key="id"
        :caption="caption"
        :created-at="createdAt"
        :image="image"
        :logo="logo"
        :source="source"
        :title="title"
        @click="article.removeSelected(id)"
      />
    </template>
  </div>
</template>

<script>
import useArticle from '~/modules/article'
import { isMobile } from '~/logic/responsive'

export default {
  setup() {
    const article = useArticle()

    return { article, isMobile }
  },
}
</script>
