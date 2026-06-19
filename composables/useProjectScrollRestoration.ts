import {
  calculateProjectReturnScrollTop,
  clearProjectReturnState,
  getProjectReturnState,
  type ProjectReturnState
} from '~/utils/portfolioNavigation'

function getCardDocumentTop({ slug }: ProjectReturnState) {
  const card = document.getElementById(`project-${slug}`)

  if (!card) {
    return null
  }

  return window.scrollY + card.getBoundingClientRect().top
}

export function useProjectScrollRestoration() {
  const returnState = import.meta.client ? getProjectReturnState() : null
  const isRestoringProjectScroll = ref(Boolean(returnState))

  function restorePosition(state: ProjectReturnState) {
    const top = calculateProjectReturnScrollTop(
      state,
      getCardDocumentTop(state)
    )

    window.scrollTo({ left: 0, top, behavior: 'auto' })
  }

  onMounted(async () => {
    if (!returnState) {
      return
    }

    await nextTick()
    requestAnimationFrame(() => {
      restorePosition(returnState)
      requestAnimationFrame(() => {
        restorePosition(returnState)
        clearProjectReturnState()
        isRestoringProjectScroll.value = false
      })
    })
  })

  return { isRestoringProjectScroll }
}
