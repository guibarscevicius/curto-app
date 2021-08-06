<template>
  <div class="flex flex-col w-full h-full">
    <g-empty v-if="!items.length">
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
        v-for="i in 20"
        :key="i"
        :image="(i % 3) ? `https://picsum.photos/${Math.floor(Math.random() * 4) + 1}00/${Math.floor(Math.random() * 4) + 1}00` : undefined"
        logo="https://i.pinimg.com/originals/a0/db/2f/a0db2ff946b49086a105a2722db66d22.png"
        brand="The Guardian"
        :title="(i % 3)
          ? 'Exemplo de cardinho de artigo. Esse artigo tem uma imagem, e ela aparece aqui.'
          : 'Exemplo de cardinho sem imagem. Nesse caso, o logo da fonte (The Guardian) aparece;'
        "
        description="Seguindo a ideia de que o cardinho tá bão mas tá ruim, podemos concluir q sempre tem como piorar. Ou melhorar"
      />
    </template>
  </div>
</template>

<script>
const items = []

export default {
  setup() {
    return { items }
  },
}
</script>
