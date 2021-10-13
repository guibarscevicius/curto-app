<template>
  <button
    ref="root"
    type="button"
    :class="classes"
    :disabled="disabled || loading"
    @click.prevent
  >
    <g-icon
      v-if="icon"
      class="icon"
      :icon="icon"
    />

    <span class="label">
      {{ label }}
    </span>

    <g-loader
      v-if="loading"
      :key="loaderSize"
      class="loader"
      :size="loaderSize"
    />
  </button>
</template>

<script>
import './button.scss'
import {
  ref,
  computed,
  onMounted,
  defineAsyncComponent,
} from 'vue'
import { SIZE_OPTIONS } from '../../helpers'

export default {
  name: 'GButton',

  components: {
    GIcon: defineAsyncComponent(() => import('../Icon/Icon')),
    GLoader: defineAsyncComponent(() => import('../Loader/Loader')),
  },

  props: {
    label: String,

    icon: String,

    size: {
      type: String,
      validator: v => SIZE_OPTIONS.includes(v),
      default: 'sm'
    },

    primary: Boolean,
    flat: Boolean,
    success: Boolean,
    error: Boolean,
    disabled: Boolean,
    loading: Boolean,
    skipUppercase: Boolean,
    fixed: Boolean,
  },

  setup (props, { emit }) {
    const root = ref(null)
    const loaderSize = ref(0)

    const classes = computed(() => ({
      'g-button': true,
      ['-' + props.size]: true,
      '-primary': props.primary,
      '-flat': props.flat,
      '-success': props.success,
      '-error': props.error,
      '-loading': props.loading,
      '-disabled': props.disabled,
      '-has-icon': props.icon,
      '-icon-only': !props.label,
      '-skip-uppercase': props.skipUppercase,
      '-fixed': props.fixed,
    }))

    onMounted(() => {
      const fontSize = window.getComputedStyle(root.value, null)
        .getPropertyValue('font-size')

      loaderSize.value = parseFloat(fontSize)
    })

    return { root, loaderSize, classes }
  },
};
</script>
