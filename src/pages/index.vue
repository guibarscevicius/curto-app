<template>
  <div class="article-list grid gap-2">
    <article-card
      v-for="i in 20"
      :key="i"
      :active="!!(i % 2) || undefined"
      :image="!!(i % 2) ? 'https://picsum.photos/200/400' : undefined"
      logo="https://picsum.photos/200/100"
      brand="batatas"
      title="Exemplo de cardinho de artigo, esse cardinho "
      description="Seguindo a ideia de que o cardinho tá bão mas tá ruim, podemos concluir q sempre tem como piorar. Ou melhorar"
    />
  </div>
</template>

<style lang="scss">
.article-list { grid-template-columns: repeat(auto-fill, minmax(20rem,1fr)) }
</style>
