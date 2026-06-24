export function useBlogFeatureGuard(statusMessage: string) {
  const {
    public: { blogEnabled }
  } = useRuntimeConfig()

  if (blogEnabled) {
    return
  }

  throw createError({ statusCode: 404, statusMessage })
}
