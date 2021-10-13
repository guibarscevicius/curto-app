<template>
  <div
    class="
      overflow-hidden
      rounded-lg
    "
    :class="active
      ? ['bg-green-100 dark:bg-green-900']
      : ['bg-gray-100 dark:bg-gray-800']"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: { active: Boolean },

  setup(props) {
    return { ...props }
  },
}
</script>
