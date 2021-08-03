<template>
  <div class="article-list grid gap-2">
    <article-card
      v-for="i in 20"
      :key="i"
      :image="(i % 3) ? `https://picsum.photos/${Math.floor(Math.random() * 4) + 1}00/${Math.floor(Math.random() * 4) + 1}00` : undefined"
      logo="https://i.pinimg.com/originals/a0/db/2f/a0db2ff946b49086a105a2722db66d22.png"
      brand="The Guardian"
      :title="(i % 3)
        ? 'Exemplo de cardinho de artigo, esse artigo tem ima imagem, e ela aparece aqui.'
        : 'Exemplo de cardinho sem imagem. Nesse caso, o logo da fonte (The Guardian) aparece;'
      "
      description="Seguindo a ideia de que o cardinho tá bão mas tá ruim, podemos concluir q sempre tem como piorar. Ou melhorar"
    />
  </div>
</template>

<style lang="scss">
.article-list {
  grid-template-columns: repeat(auto-fill, minmax(20rem,1fr));

  @media screen and (min-width: 769px) {
    grid-template-columns: repeat(auto-fill, minmax(28rem,1fr));
  }
}
</style>
