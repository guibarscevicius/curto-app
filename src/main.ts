// register vue composition api globally
import 'vue-global-api'
import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import { isMobile } from '~/logic'

import * as Sentry from "@sentry/vue"
import { BrowserTracing } from "@sentry/tracing"

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
    scrollBehavior() { return { top: 0, behavior: 'smooth' } },
  },
  (ctx) => {
    Sentry.init({
      app: ctx.app,
      dsn: "https://64a226437e144677ab2d29e372b9a1f4@o866182.ingest.sentry.io/6751677",
      integrations: [
        new BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(ctx.router),
          tracingOrigins: ["curto.rocks", /^\//],
        }),
      ],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 0.2,
      trackComponents: true,
    })

    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))

    ctx.router.beforeEach((to, from, next) => {
      if (to.meta.mobile && !isMobile.value)
        return next({ name: 'index' })

      next()
    })
  },
)
