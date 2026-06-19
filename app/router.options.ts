import type { RouterConfig } from '@nuxt/schema'
import { resolvePortfolioScroll } from '~/utils/portfolioNavigation'

export default {
  scrollBehavior(to, _from, savedPosition) {
    return resolvePortfolioScroll(to.path, savedPosition)
  }
} satisfies RouterConfig
