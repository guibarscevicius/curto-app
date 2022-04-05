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
      class="w-26 h-26 md:h-32 md:w-32"
      :class="active
        ? ['text-green-100 dark:text-green-900']
        : ['text-gray-300 dark:text-gray-700']
      "
      :src="image || logo"
      :alt="caption || title"
    />

    <!--content-->
    <div class="p-2 flex flex-col flex-nowrap justify-between flex-grow">
      <div>
        <h3 class="font-semibold line-clamp-2 mb-0.5">
          {{ title }}
        </h3>
      </div>

      <span class="block text-xs font-light text-right">{{ footer }}</span>
    </div>

    <!--actions-->
    <div></div>
  </g-card>
</template>

<script>
export default {
  props: {
    caption: {
      type: String,
      default: '',
    },

    createdAt: {
      type: String,
      default: '',
    },

    image: {
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

    title: {
      type: String,
      default: '',
    },
  },

  setup (props, { attrs: { active } }) {
    const footer = props.source
      ? `${props.source} - ${props.createdAt}`
      : props.createdAt

    return { ...props, footer, active }
  },
}
</script>
