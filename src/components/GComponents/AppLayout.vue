<template>
  <div
    class="
      app-layout md:flex md:flex-row-reverse md:flex-nowrap
    text-gray-900 dark:text-gray-200 transition duration-200 ease-in-out
    "
  >
    <!--main content-->
    <div
      class="
        w-full md:w-auto h-screen md:flex-1
        overflow-hidden
        md:ml-70
        bg-white dark:bg-gray-900
      "
    >
      <!--mobile header -->
      <header
        v-if="slots.header"
        ref="header"
        class="
          md:hidden
          sticky top-0 left-0
          px-2 py-4
          bg-gray-100 dark:bg-gray-800
          border-b-2 border-gray-300 dark:border-gray-700
        "
      >
        <slot name="header" />
      </header>

      <div class="mb-16 h-full">
        <div class="main-content pt-4 px-2 h-full overflow-y-auto" :style="{ height }">
          <slot />
        </div>
      </div>
    </div>

    <!--navbar-->
    <div
      ref="navbar"
      class="w-full md:w-70 md:h-screen
        flex flex-col-reverse flex-nowrap md:block
        fixed md:absolute bottom-0 left-0 md:top-0 md:bottom-auto
        bg-gray-100 dark:bg-gray-800
        border-t-2 md:border-r-2 md:border-t-0 border-gray-300 dark:border-gray-700"
    >
      <!--deaktop header-->
      <header
        v-if="slots.header"
        ref="desktopHeader"
        class="hidden md:block
          sticky top-0 left-0
          px-2 py-4
          bg-gray-100 dark:bg-gray-800
          border-b-2 border-gray-300 dark:border-gray-700"
      >
        <slot name="header" />
      </header>

      <!--menu items-->
      <div
        class="md:overflow-y-auto"
        :style="{ height: navbarHeight }"
      >
        <div class="px-2" :class="desktopHeader ? ['md:pt-2'] : ['md:pt-4']">
          <ul class="list-reset flex flex-row md:flex-col text-center md:text-left">
            <template v-for="item in menuItems" :key="item.name">
              <li
                v-if="isMobile || !item.mobileOnly"
                class="flex-1"
              >
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
        </div>
      </div>

      <!--additional content-->
      <div
        v-if="slots.additional"
        ref="additional"
        class="md:absolute md:bottom-0 md:left-0 w-full
          px-2 py-4
          bg-gray-100 dark:bg-gray-800
          border-b-2 md:border-b-0 md:border-t-2 border-gray-300 dark:border-gray-700"
      >
        <slot name="additional" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, watchEffect, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PlaylistIcon from 'virtual:vite-icons/carbon/media-library'
import ArticlesIcon from 'virtual:vite-icons/ci/home-outline'
import ArticlesActiveIcon from 'virtual:vite-icons/ci/home-fill'
import AboutIcon from 'virtual:vite-icons/ant-design/info-circle-outlined'
import { isDark, isMobile } from '~/logic'

const menuItems = [
  {
    name: 'playlist',
    icon: PlaylistIcon,
    mobileOnly: true,
  },
  {
    name: 'articles',
    routeName: 'index',
    icon: ArticlesIcon,
    activeIcon: ArticlesActiveIcon,
  },
  {
    name: 'about',
    icon: AboutIcon,
  },
]

export default {
  setup(_, { slots }) {
    const header = ref(null)
    const desktopHeader = ref(null)
    const navbar = ref(null)
    const additional = ref(null)

    const headerSpacing = ref(0)
    const desktopHeaderSpacing = ref(0)
    const navbarSpacing = ref(0)
    const additionalSpacing = ref(0)

    const headerCallback = () => {
      headerSpacing.value = header.value.offsetHeight
    }

    const desktopHeaderCallback = () => {
      desktopHeaderSpacing.value = desktopHeader.value.offsetHeight
    }

    const navbarCallback = () => {
      navbarSpacing.value = navbar.value.offsetHeight
    }

    const additionalCallback = () => {
      additionalSpacing.value = additional.value.offsetHeight
    }

    const headerObserver = new ResizeObserver(headerCallback)

    const desktopHeaderObserver = new ResizeObserver(desktopHeaderCallback)

    const navbarObserver = new ResizeObserver(navbarCallback)

    const additionalObserver = new ResizeObserver(additionalCallback)

    const config = { attributes: true, childList: true, subtree: true }

    const headerMutationObserver = new MutationObserver(headerCallback)

    const desktopHeaderMutationObserver = new MutationObserver(desktopHeaderCallback)

    const navbarMutationObserver = new MutationObserver(navbarCallback)

    const additionalMutationObserver = new MutationObserver(additionalCallback)

    watchEffect(() => {
      if (header.value) {
        headerObserver.observe(header.value)
        headerMutationObserver.observe(header.value, config)
      }
    })

    watchEffect(() => {
      if (desktopHeader.value) {
        desktopHeaderObserver.observe(desktopHeader.value)
        desktopHeaderMutationObserver.observe(desktopHeader.value, config)
      }
    })

    watchEffect(() => {
      if (navbar.value) {
        navbarObserver.observe(navbar.value)
        navbarMutationObserver.observe(navbar.value, config)
      }
    })

    watchEffect(() => {
      if (additional.value) {
        additionalObserver.observe(additional.value)
        additionalMutationObserver.observe(additional.value, config)
      }
    })

    watch(isDark, () => {
      headerCallback()
      desktopHeaderCallback()
      navbarCallback()
      additionalCallback()
    })

    onBeforeUnmount(() => {
      headerObserver.disconnect()
      desktopHeaderObserver.disconnect()
      navbarObserver.disconnect()
      additionalObserver.disconnect()
      headerMutationObserver.disconnect()
      desktopHeaderMutationObserver.disconnect()
      navbarMutationObserver.disconnect()
      additionalMutationObserver.disconnect()
    })

    const height = computed(() => {
      if (!isMobile.value) return '100%'

      return `calc(100% - ${headerSpacing.value + navbarSpacing.value}px)`
    })

    const navbarHeight = computed(() => {
      if (isMobile.value) return

      return `calc(100% - ${desktopHeaderSpacing.value + additionalSpacing.value}px)`
    })

    const { t } = useI18n()
    const route = useRoute()

    const isActive = ({ name, routeName }) =>
      (routeName || name) === route.name

    return {
      slots,
      header,
      desktopHeader,
      navbar,
      additional,
      height,
      navbarHeight,
      menuItems,
      t,
      isMobile,
      isActive,
    }
  },
}
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #A0A3A7;
}
</style>
