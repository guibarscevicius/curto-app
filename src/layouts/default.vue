<template>
  <app-layout>
    <template #header>
      <div class="flex flex-row justify-between">
        <div class="flex flex-row flex-nowrap items-center">
          <g-logo class="font-black dark:font-white h-8" />
          <div class="pl-2 leading-none">
            <h1 class="font-semibold">
              CURTO
            </h1>
            <h3 class="text-xs">
              {{ t('branding.slogan') }}
            </h3>
          </div>
        </div>

        <div class="actions">
          <a class="icon-btn mx-2 .space-x-0.5" :title="t('button.toggle_langs')" @click="toggleLocales">
            <carbon-language />
          </a>

          <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark">
            <carbon-moon v-if="isDark" />
            <carbon-sun v-else />
          </button>
        </div>
      </div>
    </template>

    <router-view />

    <template #additional>
      <div>
        player should go here
      </div>
    </template>
  </app-layout>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { isDark, toggleDark } from '~/logic'

export default {
  setup() {
    const { t, availableLocales, locale } = useI18n()

    const toggleLocales = () => {
      const locales = availableLocales
      locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    }

    return { isDark, toggleDark, t, toggleLocales }
  },
}
</script>
