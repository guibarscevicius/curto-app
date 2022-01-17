<script>
import './range.scss'
import { h, ref, onMounted, watch } from 'vue'

export default {
  name: 'GRange',

  props: {
    min: {
      type: [String, Number],
      default: 0,
    },

    max: {
      type: [String, Number],
      default: 100,
    },

    step: {
      type: [String, Number],
      default: 0.01,
    },

    value: {
      type: [String, Number],
      default: 0,
    },

    buffered: {
      type: [String, Number],
      default: 0,
    },
  },

  setup(props) {
    const root = ref(null)

    function onInput() {
      root.value.style.setProperty(
        '--seek-before-width',
        root.value.value / root.value.max * 100 + '%',
      )
    }

    function setBuffer(v) {
      root.value.style.setProperty(
        '--buffered-width',
        `${v / root.value.max * 100}%`,
      )
    }

    watch(() => props.buffered, setBuffer)
    watch(() => props.value, onInput)

    onMounted(() => { setBuffer(props.buffered) })

    return () => h(
      'input',
      {
        class: 'g-range relative appearance-none bg-transparent m-0 p-0 h-5',
        type: 'range',
        min: props.min,
        max: props.max,
        value: props.value,
        ref: root,
        onChange: onInput,
        onInput,
      },
    )
  },
}
</script>
