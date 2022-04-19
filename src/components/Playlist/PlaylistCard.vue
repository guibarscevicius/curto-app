<template>
  <g-card
    class="
      flex flex-row flex-nowrap
      text-xs md:text-sm
      cursor-pointer
    "
  >
    <!--image-->
    <g-image
      class="w-20 h-20"
      :class="active
        ? ['text-green-100 dark:text-green-900']
        : ['text-gray-300 dark:text-gray-700']
      "
      :src="image || logo"
      :alt="alt || title"
    />

    <!--content-->
    <div class="p-2 flex flex-col flex-nowrap justify-between flex-grow">
      <div>
        <h3 class="font-semibold line-clamp-2 mb-0.5">
          {{ title }}
        </h3>
        <p class="line-clamp-2">
          {{ description }}
        </p>
      </div>

      <span class="block text-xs font-light text-right">{{ source }}</span>
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

    createdAt: {
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

    source: {
      type: String,
      default: '',
    },
  },

  setup (props, { attrs: { active } }) {
    return { ...props, active }
  },
}
</script>
