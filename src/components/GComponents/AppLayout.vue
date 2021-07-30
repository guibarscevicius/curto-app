<template>
  <div class="md:flex md:flex-row-reverse md:flex-nowrap">
    <!--main content-->
    <div
      class="w-full md:w-auto h-screen md:flex-1
				overflow-hidden
        md:ml-70
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-200"
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

      <div class="mb-16 h-full" :style="{ height }">
        <div class="pt-4 px-2 h-full overflow-y-auto">
          <router-view />
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
        class="px-2 md:pt-4 h-16"
      >
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

      <!--additional content-->
      <div
        v-if="slots.additional"
        ref="additional"
        class="bottom-0 left-0"
      >
        <slot name="additional" />
      </div>
    </div>
  </div>
</template>

<script>
import { useMediaQuery } from '@vueuse/core'
import { ref, computed, watchEffect } from 'vue'

export default {
  setup(_, { slots }) {
    const isMobile = useMediaQuery('(max-width: 768px)')

    const header = ref(null)
    const additional = ref(null)
    const navbar = ref(null)

    const headerSpacing = ref(0)
    const additionalSpacing = ref(0)
    const navbarSpacing = ref(0)

    const headerObserver = new ResizeObserver((v) => {
      headerSpacing.value = v
        .reduce((acc, { target: { offsetHeight } = {} }) => acc + offsetHeight, 0)
    })

    const additionalObserver = new ResizeObserver((v) => {
      additionalSpacing.value = v
        .reduce((acc, { target: { offsetHeight } = {} }) => acc + offsetHeight, 0)
    })

    const navbarObserver = new ResizeObserver((v) => {
      navbarSpacing.value = v
        .reduce((acc, { target: { offsetHeight } = {} }) => acc + offsetHeight, 0)
    })

    watchEffect(() => { if (header.value) headerObserver.observe(header.value) })

    watchEffect(() => { if (additional.value) additionalObserver.observe(additional.value) })

    watchEffect(() => { if (navbar.value) additionalObserver.observe(navbar.value) })

    const height = computed(() => {
      if (!isMobile.value) return '100%'

      return `calc(100% - ${headerSpacing.value + additionalSpacing.value + navbarSpacing.value}px)`
    })

    return { slots, header, additional, navbar, height }
  },
}
</script>
