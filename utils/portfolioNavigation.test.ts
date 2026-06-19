import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  calculateProjectReturnScrollTop,
  getProjectReturnState,
  getTargetSection,
  rememberProjectPosition,
  resolvePortfolioScroll,
  storeTargetSection
} from './portfolioNavigation'

describe('portfolio navigation state', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    sessionStorage.clear()
    document.body.innerHTML = '<article id="project-portfolio"></article>'
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(640)
    const card = document.getElementById('project-portfolio')

    if (!card) {
      throw new Error('Expected the project card fixture to exist.')
    }

    vi.spyOn(card, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(0, 180, 400, 420)
    )
  })

  it('preserves the clicked card offset throughout the route round trip', () => {
    rememberProjectPosition('portfolio')

    const state = getProjectReturnState()

    if (!state) {
      throw new Error('Expected the project return state to be stored.')
    }

    expect(state).toEqual({
      slug: 'portfolio',
      scrollY: 640,
      cardViewportTop: 180
    })
    expect(resolvePortfolioScroll('/projects/portfolio', null)).toBe(false)
    expect(resolvePortfolioScroll('/', null)).toBe(false)
    expect(calculateProjectReturnScrollTop(state, 820)).toBe(640)
  })

  it('falls back to the stored page offset when the card is unavailable', () => {
    rememberProjectPosition('portfolio')

    const state = getProjectReturnState()

    if (!state) {
      throw new Error('Expected the project return state to be stored.')
    }

    expect(calculateProjectReturnScrollTop(state, null)).toBe(640)
  })

  it('gives explicit section navigation precedence over project restoration', () => {
    rememberProjectPosition('portfolio')
    storeTargetSection('skills')

    expect(getProjectReturnState()).toBeNull()
    expect(resolvePortfolioScroll('/', null)).toEqual({
      el: '#skills',
      top: 0,
      behavior: 'auto'
    })
    expect(getTargetSection()).toBeNull()
  })
})
