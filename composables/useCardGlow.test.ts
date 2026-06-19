import { describe, expect, it, vi } from 'vitest'
import { useCardGlow } from './useCardGlow'

describe('useCardGlow', () => {
  it('positions the spotlight relative to the hovered card', () => {
    const element = document.createElement('article')
    const { setCardGlow } = useCardGlow()

    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(12, 34, 200, 100)
    )
    element.addEventListener('mousemove', setCardGlow)
    element.dispatchEvent(
      new MouseEvent('mousemove', { clientX: 52, clientY: 79 })
    )

    expect(element.style.getPropertyValue('--spotlight-x')).toBe('40px')
    expect(element.style.getPropertyValue('--spotlight-y')).toBe('45px')
  })
})
