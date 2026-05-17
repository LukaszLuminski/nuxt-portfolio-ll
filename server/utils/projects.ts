import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { parse } from 'yaml'
import type { Project } from '~/features/projects/types'

const projectsDirectory = join(process.cwd(), 'content', 'projects')

export async function readProjects() {
  const filenames = await readdir(projectsDirectory)
  const projects = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.yml'))
      .map(async (filename) => {
        const source = await readFile(join(projectsDirectory, filename), 'utf8')

        return parse(source) as Project
      })
  )

  return projects.sort(({ order: previousOrder }, { order: nextOrder }) => previousOrder - nextOrder)
}
