<template>
  <div
    class="
      flex flex-col flex-nowrap justify-center items-center
      w-full py-4 px-4 gap-2
      text-center
      text-gray-500 dark:text-gray-400
      border-1 rounded-lg border-dashed
      border-gray-400 dark:border-gray-600
    "
  >
    <component
      :is="component"
      class="w-30 h-30"
      :class="slots.default ? 'mb-4' : ''"
    />
    <slot />
  </div>
</template>

<script>
import HeartBroken from 'virtual:vite-icons/fluent/heart-broken-16-regular'
import SeeNoEvil from 'virtual:vite-icons/emojione-monotone/see-no-evil-monkey'
import HearNoEvil from 'virtual:vite-icons/emojione-monotone/hear-no-evil-monkey'
import SpeakNoEvil from 'virtual:vite-icons/emojione-monotone/speak-no-evil-monkey'
import Ghost from 'virtual:vite-icons/ri/ghost-line'
import Sad from 'virtual:vite-icons/akar-icons/face-very-sad'
import Sweat from 'virtual:vite-icons/ri/emotion-sad-line'
import Desert from 'virtual:vite-icons/uil/desert'
import Astronaut from 'virtual:vite-icons/fa-solid/user-astronaut'
import Waiting from 'virtual:vite-icons/medical-icon/i-waiting-area'
import Moon from 'virtual:vite-icons/iconoir/moon-sat'
import Plant from 'virtual:vite-icons/tabler/plant'
import CloudSun from 'virtual:vite-icons/bi/cloud-sun'
import Cup from 'virtual:vite-icons/ri/cup-line'
import Island from 'virtual:vite-icons/mdi/island'
import Cactus from 'virtual:vite-icons/ri/cactus-line'

const characters = [
  HeartBroken,
  SeeNoEvil,
  HearNoEvil,
  SpeakNoEvil,
  Ghost,
  Sad,
  Sweat,
  Desert,
  Astronaut,
  Waiting,
  Moon,
  Plant,
  CloudSun,
  Cup,
  Island,
  Cactus,
]

export default {
  setup(_, { slots }) {
    const component = characters[
      Math.floor(Math.random() * characters.length)
    ]

    return { component, slots }
  },
}
</script>
