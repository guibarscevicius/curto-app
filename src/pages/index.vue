<template>
  <div class="article-list grid gap-2">
    <g-card
      v-for="i in 20"
      :key="i"
    >
      <h1 class="text-9xl">
        oie sou o cardinho {{ i }}
      </h1>
    </g-card>
  </div>
</template>

<style lang="scss">
.article-list { grid-template-columns: repeat(auto-fill, minmax(20rem,1fr)) }
</style>
