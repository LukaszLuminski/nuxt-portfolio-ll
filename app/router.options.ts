import type { RouterConfig } from '@nuxt/schema'
import {
  clearStoredScrollY,
  clearTargetSection,
  getReturnProjectSlug,
  getStoredScrollY,
  getTargetSection
} from '~/utils/portfolioNavigation'

export default {
  scrollBehavior(to, from, savedPosition) {
    const returnProject = getReturnProjectSlug()

    if (
      returnProject &&
      (to.path === '/' || to.path.startsWith('/projects/'))
    ) {
      return false
    }

    if (to.path !== '/') {
      return { left: 0, top: 0, behavior: 'auto' }
    }

    const targetSection = getTargetSection()
    const scrollY = getStoredScrollY()

    if (returnProject) {
      return false
    }

    if (targetSection) {
      clearTargetSection()

      return {
        el: `#${targetSection}`,
        top: 0,
        behavior: 'auto'
      }
    }

    if (scrollY) {
      clearStoredScrollY()

      return {
        left: 0,
        top: Number(scrollY),
        behavior: 'auto'
      }
    }

    return savedPosition ?? { left: 0, top: 0 }
  }
} satisfies RouterConfig
