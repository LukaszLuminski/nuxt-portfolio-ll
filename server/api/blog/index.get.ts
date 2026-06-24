export default defineEventHandler(async (event) => {
  ensureBlogEnabled(event, 'Blog not found')

  const posts = await readPublishedBlogPosts()

  return posts.map(toBlogPostSummary)
})
