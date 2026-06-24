import {
  clearTargetSection,
  getTargetSection
} from '~/utils/portfolioNavigation'

function scrollToTargetSection(sectionId: string) {
  document
    .getElementById(sectionId)
    ?.scrollIntoView({ behavior: 'auto', block: 'start' })
}

export function useTargetSectionNavigation() {
  onMounted(async () => {
    const targetSection = getTargetSection()

    if (!targetSection) {
      return
    }

    await nextTick()
    requestAnimationFrame(() => {
      scrollToTargetSection(targetSection)
      requestAnimationFrame(() => {
        scrollToTargetSection(targetSection)
        clearTargetSection()
      })
    })
  })
}
