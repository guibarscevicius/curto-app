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
    </g-empty>

    <template v-else>
      <playlist-card
        v-for="({ _id, title, description, media }) in article.listSelected()"
        :key="_id"
        :image="media"
        logo="https://i.pinimg.com/originals/a0/db/2f/a0db2ff946b49086a105a2722db66d22.png"
        brand="The Guardian"
        :title="title"
        :description="description"
        @click="article.removeSelected(_id)"
      />
    </template>
  </div>
</template>

<script>
import useArticle from '~/modules/article'

export default {
  setup() {
    const article = useArticle()

    return { article }
  },
}
</script>
