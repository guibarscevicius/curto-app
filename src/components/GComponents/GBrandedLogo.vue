<template>
  <div
    class="
      flex flex-row flex-nowrap items-center
      font-black dark:font-white
      select-none
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
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const { t } = useI18n()
    return { t }
  },
}
</script>
