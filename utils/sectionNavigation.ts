function nextAnimationFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
}

export async function scrollToSectionWhenAvailable(
  sectionId: string,
  behavior: ScrollBehavior = 'auto',
  maxFrames = 120
) {
  for (let frame = 0; frame < maxFrames; frame += 1) {
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({ behavior, block: 'start' })
      await nextAnimationFrame()
      section.scrollIntoView({ behavior, block: 'start' })
      return true
    }

    await nextAnimationFrame()
  }

  return false
}
