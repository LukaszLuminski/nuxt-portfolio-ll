import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { scrollToSectionWhenAvailable } from './sectionNavigation'

describe('section navigation', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('waits for a section to mount before scrolling to it', async () => {
    const scrollIntoView = vi.fn()
    let frame = 0

    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      frame += 1

      if (frame === 2) {
        const section = document.createElement('section')
        section.id = 'work'
        section.scrollIntoView = scrollIntoView
        document.body.append(section)
      }

      callback(frame)
      return frame
    })

    await expect(scrollToSectionWhenAvailable('work')).resolves.toBe(true)
    expect(scrollIntoView).toHaveBeenCalledTimes(2)
    expect(scrollIntoView).toHaveBeenLastCalledWith({
      behavior: 'auto',
      block: 'start'
    })
  })

  it('keeps the target pending when the section does not mount in time', async () => {
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      callback(0)
      return 1
    })

    await expect(scrollToSectionWhenAvailable('work', 'auto', 2)).resolves.toBe(
      false
    )
  })
})
