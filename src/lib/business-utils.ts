/**
 * Resolve business slug from query parameters or environment variables
 * Query parameter takes precedence to support multi-tenant previews
 */
export function resolveBusinessSlug(
  queryParam?: string,
  envSlug?: string,
  fallback: string = 'johnny-gs-brunch'
): string {
  return queryParam || envSlug || fallback
}

/**
 * Log business slug resolution for debugging
 */
export function logBusinessSlugResolution(
  fromQueryParam: string | undefined,
  fromEnv: string | undefined,
  finalBusinessSlug: string,
  pageSlug: string
): void {
  console.log('[page.tsx] Business slug resolved:', {
    fromQueryParam,
    fromEnv,
    finalBusinessSlug,
    pageSlug,
  })
}
