interface SavedScrollPosition {
  behavior?: ScrollBehavior
  left: number
  top: number
}

export interface ProjectReturnState {
  slug: string
  scrollY: number
  cardViewportTop: number | null
}

const storageKeys = {
  cardViewportTop: 'portfolio-card-viewport-top',
  returnProject: 'portfolio-return-project',
  scrollY: 'portfolio-scroll-y',
  targetSection: 'portfolio-target-section'
} as const

function readStoredNumber(key: string) {
  const value = sessionStorage.getItem(key)

  if (value === null) {
    return null
  }

  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

export function rememberProjectPosition(slug: string) {
  const cardViewportTop = document
    .getElementById(`project-${slug}`)
    ?.getBoundingClientRect().top

  sessionStorage.setItem(storageKeys.returnProject, slug)
  sessionStorage.setItem(storageKeys.scrollY, String(window.scrollY))

  if (cardViewportTop === undefined) {
    sessionStorage.removeItem(storageKeys.cardViewportTop)
    return
  }

  sessionStorage.setItem(storageKeys.cardViewportTop, String(cardViewportTop))
}

export function getProjectReturnState(): ProjectReturnState | null {
  const slug = sessionStorage.getItem(storageKeys.returnProject)

  if (!slug) {
    return null
  }

  return {
    slug,
    scrollY: readStoredNumber(storageKeys.scrollY) ?? 0,
    cardViewportTop: readStoredNumber(storageKeys.cardViewportTop)
  }
}

export function clearProjectReturnState() {
  sessionStorage.removeItem(storageKeys.cardViewportTop)
  sessionStorage.removeItem(storageKeys.returnProject)
  sessionStorage.removeItem(storageKeys.scrollY)
}

export function calculateProjectReturnScrollTop(
  state: ProjectReturnState,
  cardDocumentTop: number | null
) {
  if (cardDocumentTop === null || state.cardViewportTop === null) {
    return Math.max(0, state.scrollY)
  }

  return Math.max(0, cardDocumentTop - state.cardViewportTop)
}

export function storeTargetSection(sectionId: string) {
  clearProjectReturnState()
  sessionStorage.setItem(storageKeys.targetSection, sectionId)
}

export function getTargetSection() {
  return sessionStorage.getItem(storageKeys.targetSection)
}

export function clearTargetSection() {
  sessionStorage.removeItem(storageKeys.targetSection)
}

export function resolvePortfolioScroll(
  path: string,
  savedPosition: SavedScrollPosition | null
) {
  const targetSection = getTargetSection()

  if (path === '/' && targetSection) {
    return false
  }

  const isProjectRoundTrip =
    Boolean(getProjectReturnState()) &&
    (path === '/' || path.startsWith('/projects/'))

  if (isProjectRoundTrip) {
    return false
  }

  if (path !== '/') {
    return { left: 0, top: 0, behavior: 'auto' } as const
  }

  return savedPosition ?? { left: 0, top: 0 }
}
