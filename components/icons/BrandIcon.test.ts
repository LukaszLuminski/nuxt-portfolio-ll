import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BrandIcon from './BrandIcon.vue'

describe('BrandIcon', () => {
  it('renders both supported brand variants', async () => {
    const wrapper = mount(BrandIcon, {
      props: { type: 'linkedin', strokeWidth: 1.5 }
    })

    expect(wrapper.attributes('stroke-width')).toBe('1.5')
    expect(wrapper.find('rect').exists()).toBe(true)
    expect(wrapper.find('circle').exists()).toBe(true)

    await wrapper.setProps({ type: 'github' })

    expect(wrapper.findAll('path')).toHaveLength(2)
    expect(wrapper.find('rect').exists()).toBe(false)
    expect(wrapper.find('circle').exists()).toBe(false)
  })
})
