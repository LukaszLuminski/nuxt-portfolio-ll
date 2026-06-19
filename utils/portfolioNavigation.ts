export const projectCardScrollOffset = 104

const storageKeys = {
  returnProject: 'portfolio-return-project',
  scrollY: 'portfolio-scroll-y',
  targetSection: 'portfolio-target-section'
} as const

export function rememberProjectPosition(slug: string) {
  sessionStorage.setItem(storageKeys.returnProject, slug)
  sessionStorage.setItem(storageKeys.scrollY, String(window.scrollY))
}

export function getReturnProjectSlug() {
  return sessionStorage.getItem(storageKeys.returnProject)
}

export function clearProjectReturnState() {
  sessionStorage.removeItem(storageKeys.returnProject)
  sessionStorage.removeItem(storageKeys.scrollY)
}

export function storeTargetSection(sectionId: string) {
  sessionStorage.setItem(storageKeys.targetSection, sectionId)
}

export function getTargetSection() {
  return sessionStorage.getItem(storageKeys.targetSection)
}

export function clearTargetSection() {
  sessionStorage.removeItem(storageKeys.targetSection)
}

export function getStoredScrollY() {
  return sessionStorage.getItem(storageKeys.scrollY)
}

export function clearStoredScrollY() {
  sessionStorage.removeItem(storageKeys.scrollY)
}
