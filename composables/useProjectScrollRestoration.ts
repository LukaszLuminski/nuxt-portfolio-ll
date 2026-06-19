import type { Ref } from 'vue'
import {
  clearProjectReturnState,
  getReturnProjectSlug,
  projectCardScrollOffset
} from '~/utils/portfolioNavigation'

export function useProjectScrollRestoration(projects: Ref<readonly unknown[]>) {
  const isRestoringProjectScroll = ref(false)

  function restoreProjectScroll(slug: string) {
    const target = document.getElementById(`project-${slug}`)

    if (!target) {
      isRestoringProjectScroll.value = false
      return
    }

    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      projectCardScrollOffset

    window.scrollTo(0, top)
    isRestoringProjectScroll.value = false
  }

  onBeforeMount(() => {
    isRestoringProjectScroll.value = Boolean(getReturnProjectSlug())
  })

  onMounted(() => {
    const stopWatching = watch(
      projects,
      async ({ length }) => {
        const slug = getReturnProjectSlug()

        if (!slug || !length) {
          return
        }

        clearProjectReturnState()

        await nextTick()
        stopWatching()
        requestAnimationFrame(() => restoreProjectScroll(slug))
      },
      { immediate: true }
    )
  })

  return { isRestoringProjectScroll }
}
