<template>
  <app-layout>
    <template #header>
      <div class="flex flex-row justify-between">
        <div
          class="
            flex flex-row flex-nowrap items-center
            font-black dark:font-white
          "
        >
          <g-logo class="h-8" />
          <div class="pl-2 leading-none">
            <h1 class="font-semibold">
              CURTO
            </h1>
            <h3 class="text-xs font-normal">
              {{ t('branding.slogan') }}
            </h3>
          </div>
        </div>

        <div class="actions">
          <a
            class="icon-btn mx-2 .space-x-0.5"
            :title="t('button.toggle_langs')"
            @click="toggleLocales"
          >
            <carbon-language />
          </a>

          <button
            class="icon-btn mx-2 !outline-none"
            :title="t('button.toggle_dark')"
            @click="toggleDark"
          >
            <carbon-moon v-if="isDark" />
            <carbon-sun v-else />
          </button>
        </div>
      </div>
    </template>

    <router-view />

    <template #menu>
      <ul class="list-reset flex flex-row md:flex-col text-center md:text-left">
        <template v-for="item in menuItems" :key="item.name">
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

    <template #additional>
      <g-player />
    </template>
  </app-layout>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { isDark, toggleDark } from '~/logic'
import { menuItems } from '~/content'

export default {
  setup() {
    const { t, availableLocales, locale } = useI18n()
    const route = useRoute()

    const toggleLocales = () => {
      const locales = availableLocales
      locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    }

    const isActive = ({ name, routeName }) =>
      (routeName || name) === route.name

    return { isDark, toggleDark, t, toggleLocales, menuItems, isActive }
  },
}
</script>
