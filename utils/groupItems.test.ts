import { describe, expect, it } from 'vitest'
import { groupItems } from './groupItems'

describe('groupItems', () => {
  it('preserves label order and assigns matching items', () => {
    const groups = { first: 'First group', second: 'Second group' } as const
    const items = [
      { group: 'second' as const, value: 2 },
      { group: 'first' as const, value: 1 }
    ]

    expect(groupItems(groups, items)).toEqual([
      {
        group: 'first',
        label: 'First group',
        items: [{ group: 'first', value: 1 }]
      },
      {
        group: 'second',
        label: 'Second group',
        items: [{ group: 'second', value: 2 }]
      }
    ])
  })
})
