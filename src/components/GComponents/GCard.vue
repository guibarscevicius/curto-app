<template>
  <div
    class="
      overflow-hidden
      rounded-lg
    "
    :class="active ? [`
      border-green-200 dark:border-green-800
      bg-green-100 dark:bg-green-900
    `] : [`
      bg-gray-100 dark:bg-gray-800
      border-2 border-gray-100 dark:border-gray-800
    `]"
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
