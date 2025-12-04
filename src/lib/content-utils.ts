import type { PageSection } from './pages'

/**
 * Check if content has meaningful data
 */
export function hasContent(content: unknown): boolean {
  if (!content) return false
  if (typeof content !== 'object') return false
  if (Array.isArray(content)) return content.length > 0
  
  const contentObj = content as Record<string, unknown>
  const keys = Object.keys(contentObj)
  if (keys.length === 0) return false
  
  // Check if at least one key has a non-empty value
  return keys.some(key => {
    const value = contentObj[key]
    if (value === null || value === undefined) return false
    if (typeof value === 'string' && value.trim() === '') return false
    if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) return false
    return true
  })
}

/**
 * Select the appropriate content for a section based on draft mode
 * 
 * When in draft mode (preview token valid), use draft_content if it exists and has content,
 * otherwise fall back to published_content.
 * 
 * When in published mode (no token or invalid token), use published_content if it exists and has content,
 * otherwise fall back to draft_content.
 */
export function selectSectionContent(
  section: PageSection,
  isDraftMode: boolean
): Record<string, unknown> {
  if (isDraftMode) {
    // Draft mode: Use draft_content if it exists and has content, otherwise fall back to published_content
    if (hasContent(section.draft_content)) {
      return section.draft_content as Record<string, unknown>
    } else if (hasContent(section.published_content)) {
      return section.published_content as Record<string, unknown>
    } else {
      return {}
    }
  } else {
    // Published mode: Use published_content if it exists and has content, otherwise fall back to draft_content
    if (hasContent(section.published_content)) {
      return section.published_content as Record<string, unknown>
    } else if (hasContent(section.draft_content)) {
      return section.draft_content as Record<string, unknown>
    } else {
      return {}
    }
  }
}
