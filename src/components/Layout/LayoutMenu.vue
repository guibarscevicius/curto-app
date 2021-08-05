<template>
  <ul class="list-reset flex flex-row md:flex-col text-center md:text-left">
    <template v-for="item in items" :key="item.name">
      <li class="flex-1">
        <router-link
          :to="{ name: item.routeName || item.name }"
          class="
            no-underline
            block md:flex md:flex-row md:flex-nowrap md:content-center
            py-1.5 md:py-3 md:px-3
            hover:text-gray-700 dark:hover:text-gray-300
            transition duration-200 ease-in-out
            rounded-lg
          "
          :class="[
            ...isActive(item)
              ? ['text-gray-800 dark:text-gray-200']
              : ['text-gray-400 dark:text-gray-500'],
            ...isActive(item) ? [
              'md:bg-gray-300 md:dark:bg-gray-700'
            ] : []
          ]
          "
        >
          <component
            :is="(isActive(item) && item.activeIcon) || item.icon"
            class="inline md:mr-3"
            :height="isMobile ? '1.8em' : '2em'"
            :width="isMobile ? '1.8em' : '2em'"
          />

          <span
            class="
              text-xs md:text-base
              block md:inline-flex md:items-center
            "
          >{{ t('menu.' + item.name) }}</span>
        </router-link>
      </li>
    </template>
  </ul>
</template>

<script>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { isMobile } from '~/logic'

export default {
  props: {
    items: {
      type: Array,
      default: () => ([]),
    },
  },

  setup(props) {
    const route = useRoute()
    const { t } = useI18n()

    const isActive = ({ name, routeName }) =>
      (routeName || name) === route.name

    return { t, isMobile, isActive, ...props }
  },
}
</script>
