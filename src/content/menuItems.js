import { computed } from 'vue'

import PlaylistIcon from 'virtual:vite-icons/carbon/media-library'
import ArticlesIcon from 'virtual:vite-icons/ci/home-outline'
import ArticlesActiveIcon from 'virtual:vite-icons/ci/home-fill'
import AboutIcon from 'virtual:vite-icons/ant-design/info-circle-outlined'

import { isMobile } from '~/logic'

export const menuItems = computed(() => [
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
].filter(({ mobileOnly }) => isMobile.value || !mobileOnly))
