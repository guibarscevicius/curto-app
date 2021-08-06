<template>
  <div
    class="
      md:flex md:flex-row-reverse md:flex-nowrap
    text-gray-900 dark:text-gray-200
    transition duration-200 ease-in-out
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
          border-b-2
          border-gray-300 dark:border-gray-700
        "
      >
        <slot name="header" />
      </header>

      <div class="mb-16 h-full">
        <div
          class="pt-4 px-2 h-full overflow-y-auto"
          :style="{ height }"
        >
          <div class="relative w-full h-full">
            <router-view v-slot="{ Component }">
              <transition name="fade">
                <component
                  :is="Component"
                  class="absolute top-0 left-0 pb-4 w-full"
                />
              </transition>
            </router-view>
          </div>
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
        border-t-2 md:border-r-2 md:border-t-0
        border-gray-300 dark:border-gray-700"
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
        ref="desktopMenu"
        :class="[...(slots.sidebarContent
          ? ['md:border-b-2 md:border-gray-300 md:dark:border-gray-700']
          : []
        )]"
      >
        <div
          v-if="slots.menu"
          class="px-2"
          :class="desktopHeader
            ? ['md:pt-2']
            : ['md:pt-4']"
        >
          <slot name="menu" />
        </div>
      </div>

      <!--desktop content-->
      <div
        v-if="!isMobile && slots.sidebarContent"
        class="md:overflow-y-auto"
        :style="{ height: navbarContentHeight }"
      >
        <div
          v-if="slots.menu"
          class="px-2"
          :class="desktopHeader || slots.menu
            ? ['md:pt-2']
            : ['md:pt-4']"
        >
          <slot name="sidebarContent" />
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
import { useI18n } from 'vue-i18n'
import { isDark, isMobile } from '~/logic'

export default {
  setup(_, { slots }) {
    const header = ref(null)
    const desktopHeader = ref(null)
    const desktopMenu = ref(null)
    const navbar = ref(null)
    const additional = ref(null)

    const headerSpacing = ref(0)
    const desktopHeaderSpacing = ref(0)
    const desktopMenuSpacing = ref(0)
    const navbarSpacing = ref(0)
    const additionalSpacing = ref(0)

    const headerCallback = () => {
      headerSpacing.value = header.value.offsetHeight
    }

    const desktopHeaderCallback = () => {
      desktopHeaderSpacing.value = desktopHeader.value.offsetHeight
    }

    const desktopMenuCallback = () => {
      desktopMenuSpacing.value = desktopMenu.value.offsetHeight
    }

    const navbarCallback = () => {
      navbarSpacing.value = navbar.value.offsetHeight
    }

    const additionalCallback = () => {
      additionalSpacing.value = additional.value.offsetHeight
    }

    const headerObserver = new ResizeObserver(headerCallback)

    const desktopHeaderObserver = new ResizeObserver(desktopHeaderCallback)

    const desktopMenuObserver = new ResizeObserver(desktopMenuCallback)

    const navbarObserver = new ResizeObserver(navbarCallback)

    const additionalObserver = new ResizeObserver(additionalCallback)

    const config = { attributes: true, childList: true, subtree: true }

    const headerMutationObserver = new MutationObserver(headerCallback)

    const desktopHeaderMutationObserver = new MutationObserver(desktopHeaderCallback)

    const desktopMenuMutationObserver = new MutationObserver(desktopMenuCallback)

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
      if (desktopMenu.value) {
        desktopMenuObserver.observe(desktopMenu.value)
        desktopMenuMutationObserver.observe(desktopMenu.value, config)
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
      desktopMenuCallback()
      navbarCallback()
      additionalCallback()
    })

    onBeforeUnmount(() => {
      headerObserver.disconnect()
      desktopHeaderObserver.disconnect()
      desktopMenuObserver.disconnect()
      navbarObserver.disconnect()
      additionalObserver.disconnect()
      headerMutationObserver.disconnect()
      desktopHeaderMutationObserver.disconnect()
      desktopMenuMutationObserver.disconnect()
      navbarMutationObserver.disconnect()
      additionalMutationObserver.disconnect()
    })

    const height = computed(() => {
      if (!isMobile.value) return '100%'

      return `calc(100% - ${headerSpacing.value + navbarSpacing.value}px)`
    })

    const navbarContentHeight = computed(() => {
      if (isMobile.value) return

      return `calc(100% - ${
        desktopHeaderSpacing.value
        + desktopMenuSpacing.value
        + additionalSpacing.value
      }px)`
    })

    const { t } = useI18n()

    return {
      slots,
      header,
      desktopHeader,
      desktopMenu,
      navbar,
      additional,
      height,
      navbarContentHeight,
      t,
      isMobile,
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
