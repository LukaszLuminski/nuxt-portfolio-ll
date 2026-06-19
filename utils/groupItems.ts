type GroupLabels<TKey extends string> = Readonly<Record<TKey, string>>

function typedEntries<TObject extends object>(object: TObject) {
  return Object.entries(object) as {
    [TKey in keyof TObject]: [TKey, TObject[TKey]]
  }[keyof TObject][]
}

export function groupItems<TKey extends string, TItem extends { group: TKey }>(
  labels: GroupLabels<TKey>,
  items: readonly TItem[]
) {
  return typedEntries(labels).map(([group, label]) => ({
    group,
    label,
    items: items.filter(({ group: itemGroup }) => itemGroup === group)
  }))
}
