<template>
  <app-layout>
    <template #header>
      <div class="flex flex-row justify-between">
        <g-logo />

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
