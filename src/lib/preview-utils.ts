import { validatePreviewToken } from './preview'

export interface PreviewTokenValidation {
  useDraft: boolean
  tokenValid: boolean
}

/**
 * Validate preview token and determine if draft mode should be used
 */
export async function validateAndResolvePreviewMode(
  previewToken: string | undefined,
  pageId: string
): Promise<PreviewTokenValidation> {
  if (!previewToken) {
    return { useDraft: false, tokenValid: false }
  }

  const validation = await validatePreviewToken(previewToken, undefined, pageId)
  const useDraft = validation.valid
  const tokenValid = validation.valid

  console.log('[page.tsx] Preview token validation:', {
    token: previewToken.substring(0, 8) + '...',
    valid: validation.valid,
    error: validation.error,
    useDraft,
  })

  return { useDraft, tokenValid }
}

/**
 * Log content mode resolution for debugging
 */
export function logContentModeResolution(
  previewToken: string | undefined,
  tokenValid: boolean,
  useDraft: boolean,
  resolvedUseDraft: boolean,
  sectionsCount: number
): void {
  console.log('[page.tsx] Content mode resolved:', {
    previewToken: previewToken ? previewToken.substring(0, 8) + '...' : null,
    tokenValid,
    useDraft,
    resolvedUseDraft,
    sectionsCount,
  })
}
