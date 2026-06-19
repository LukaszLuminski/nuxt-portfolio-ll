import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  clearProjectReturnState,
  clearTargetSection,
  getReturnProjectSlug,
  getStoredScrollY,
  getTargetSection,
  rememberProjectPosition,
  storeTargetSection
} from './portfolioNavigation'

describe('portfolio navigation state', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(640)
  })

  it('stores and clears the originating project position together', () => {
    rememberProjectPosition('portfolio')

    expect(getReturnProjectSlug()).toBe('portfolio')
    expect(getStoredScrollY()).toBe('640')

    clearProjectReturnState()

    expect(getReturnProjectSlug()).toBeNull()
    expect(getStoredScrollY()).toBeNull()
  })

  it('stores and clears a target homepage section', () => {
    storeTargetSection('skills')
    expect(getTargetSection()).toBe('skills')

    clearTargetSection()
    expect(getTargetSection()).toBeNull()
  })
})
