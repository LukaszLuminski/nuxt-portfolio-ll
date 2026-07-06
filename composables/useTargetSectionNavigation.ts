import {
  clearTargetSection,
  getTargetSection
} from '~/utils/portfolioNavigation'
import { scrollToSectionWhenAvailable } from '~/utils/sectionNavigation'

export function useTargetSectionNavigation() {
  onMounted(async () => {
    const targetSection = getTargetSection()

    if (!targetSection) {
      return
    }

    await nextTick()

     if (!(await scrollToSectionWhenAvailable(targetSection))) return;

      clearTargetSection()
  })
}
