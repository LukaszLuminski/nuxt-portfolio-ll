export default defineEventHandler(async () => {
  const projectsStorage = useStorage<string>('assets:projects')
  const filenames = await projectsStorage.getKeys()

  return readProjects(filenames, async (filename) => {
    const source = await projectsStorage.getItem(filename)

    if (typeof source !== 'string') {
      throw new Error(`Unable to read bundled project content: ${filename}`)
    }

    return source
  })
})
