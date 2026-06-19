export function useCardGlow() {
  function setCardGlow(event: MouseEvent) {
    const element = event.currentTarget

    if (!(element instanceof HTMLElement)) {
      return
    }

    const { left, top } = element.getBoundingClientRect()

    element.style.setProperty('--spotlight-x', `${event.clientX - left}px`)
    element.style.setProperty('--spotlight-y', `${event.clientY - top}px`)
  }

  return { setCardGlow }
}
