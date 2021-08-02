<template>
  <div
    class="app-layout md:flex md:flex-row-reverse md:flex-nowrap
        text-gray-900 dark:text-gray-200"
  >
    <!--main content-->
    <div
      class="w-full md:w-auto h-screen md:flex-1
        overflow-hidden
        md:ml-70
        bg-white dark:bg-gray-900"
    >
      <!--mobile header -->
      <header
        v-if="slots.header"
        ref="header"
        class="md:hidden
          sticky top-0 left-0
          px-2 py-4
          bg-gray-100 dark:bg-gray-800
          border-b-2 border-gray-300 dark:border-gray-700"
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
        <div class="px-2 md:pt-4 h-16 md:h-screen">
          <ul class="list-reset flex flex-row md:flex-col text-center md:text-left">
            <li class="mr-3 flex-1">
              <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500">
                <i class="fas fa-link pr-0 md:pr-3"></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Link</span>
              </a>
            </li>
            <li class="mr-3 flex-1">
              <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500">
                <i class="fas fa-link pr-0 md:pr-3"></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Link</span>
              </a>
            </li>
            <li class="mr-3 flex-1">
              <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-pink-600">
                <i class="fas fa-link pr-0 md:pr-3 text-pink-500"></i><span class="pb-1 md:pb-0 text-xs md:text-base text-white md:font-bold block md:inline-block">Active Link</span>
              </a>
            </li>
            <li class="mr-3 flex-1">
              <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500">
                <i class="fas fa-link pr-0 md:pr-3"></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Link</span>
              </a>
            </li>
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
import { useMediaQuery } from '@vueuse/core'
import { isDark } from '~/logic'

export default {
  setup(_, { slots }) {
    const isMobile = useMediaQuery('(max-width: 768px)')

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

    return { slots, header, desktopHeader, navbar, additional, height, navbarHeight }
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
