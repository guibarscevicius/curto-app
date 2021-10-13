<template>
  <div
    class="bg-no-repeat bg-center flex-shrink-0"
    :class="contain ? 'bg-contain' : 'bg-cover'"
    :style="{ backgroundImage: `url(${attrs.src})` }"
  >
    <img v-bind="attrs" class="opacity-0" />
  </div>
</template>

<script>
export default {
  props: { contain: Boolean },

  setup(props, { attrs }) {
    return { ...props, attrs }
  },
}
</script>
