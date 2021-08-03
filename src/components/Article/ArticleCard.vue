<template>
  <g-card
    class="
      flex flex-row flex-nowrap
      p-2
      gap-2
      text-xs
    "
  >
    <!--image-->
    <g-image
      class="w-18 h-18"
      :class="active
        ? ['text-green-100 dark:text-green-900']
        : ['text-gray-300 dark:text-gray-700']
      "
      :src="image || logo"
      :alt="alt || title"
      :secondary-image="image && logo"
      :secondary-alt="image && brand"
    />

    <!--content-->
    <div>
      <h3 class="font-semibold line-clamp-2 mb-0.5">
        {{ title }}
      </h3>
      <p class="line-clamp-2">
        {{ description }}
      </p>
    </div>

    <!--actions-->
    <div></div>
  </g-card>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: '',
    },

    alt: {
      type: String,
      default: '',
    },

    title: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    logo: {
      type: String,
      default: '',
    },

    brand: {
      type: String,
      default: '',
    },
  },

  setup(props, { attrs: { active } }) {
    return { ...props, active }
  },
}
</script>
