import type { RouterConfig } from '@nuxt/schema'

export default {
  scrollBehavior(to, from, savedPosition) {
    const returnProject = sessionStorage.getItem('portfolio-return-project')

    if (returnProject && (to.path === '/' || to.path.startsWith('/projects/'))) {
      return false
    }

    if (to.path !== '/') {
      return { left: 0, top: 0, behavior: 'auto' }
    }

    const targetSection = sessionStorage.getItem('portfolio-target-section')
    const scrollY = sessionStorage.getItem('portfolio-scroll-y')

    if (returnProject) {
      return false
    }

    if (targetSection) {
      sessionStorage.removeItem('portfolio-target-section')

      return {
        el: `#${targetSection}`,
        top: 0,
        behavior: 'auto'
      }
    }

    if (scrollY) {
      sessionStorage.removeItem('portfolio-scroll-y')

      return {
        left: 0,
        top: Number(scrollY),
        behavior: 'auto'
      }
    }

    return savedPosition ?? { left: 0, top: 0 }
  }
} satisfies RouterConfig
