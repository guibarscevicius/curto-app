<template>
  <div
    class="bg-no-repeat bg-center flex-shrink-0 relative"
    :class="contain ? 'bg-contain' : 'bg-cover'"
    :style="{ backgroundImage: `url(${attrs.src})` }"
  >
    <img v-bind="attrs" class="opacity-0" />

    <div
      v-if="attrs.src && secondaryImage"
      class="
        bg-no-repeat bg-center bg-cover
        absolute top-0 left-0 w-2/5
        border-b-2 border-r-2 border-current
        bg-current
      "
      :style="{ backgroundImage: `url(${secondaryImage})` }"
    >
      <img
        class="opacity-0"
        :src="secondaryImage"
        :alt="secondaryAlt || attrs.alt"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contain: Boolean,

    secondaryImage: {
      type: String,
      default: '',
    },

    secondaryAlt: {
      type: String,
      default: '',
    },
  },

  setup(props, { attrs }) {
    return { ...props, attrs }
  },
}
</script>
