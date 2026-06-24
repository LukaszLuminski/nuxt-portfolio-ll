export default defineEventHandler(async (event) => {
  ensureBlogEnabled(event, 'Post not found')

  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  const posts = await readPublishedBlogPosts()
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  return post
})
