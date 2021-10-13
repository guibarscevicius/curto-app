<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useMediaQuery, useDark } from '@vueuse/core'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'CURTO',
  meta: [
    { name: 'description', content: 'listen to the web' },
  ],
})

if (
  !localStorage.getItem('vueuse-color-scheme')
  && useMediaQuery('(prefers-color-scheme: dark)').value
) useDark()
</script>

<template>
  <router-view />
</template>
