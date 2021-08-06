<template>
  <g-app-layout>
    <template #header>
      <layout-header />
    </template>

    <router-view />

    <template #menu>
      <layout-menu :items="menuItems" />
    </template>

    <template #sidebarContent>
      <playlist-list />
    </template>

    <template #additional>
      <g-player />
    </template>
  </g-app-layout>
</template>

<script>
import { menuItems } from '~/content'

export default {
  setup() {
    return { menuItems }
  },
}
</script>
