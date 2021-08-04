// register vue composition api globally
import 'vue-global-api'
import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createWebHistory } from 'vue-router'
import App from './App.vue'
import { isMobile } from '~/logic'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// your custom styles here
import './styles/main.css'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes,
    history: createWebHistory(),
    scrollBehavior() { return { top: 0, behavior: 'smooth' } },
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))

    ctx.router.beforeEach((to, from, next) => {
      if (to.meta.mobile && !isMobile.value)
        return next({ name: 'index' })

      next()
    })
  },
)
