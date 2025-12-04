import { cn } from "@/lib/utils";
import DynamicSection from "@/components/dynamic-section";
import { getPageBySlug, getPageSections } from "@/lib/pages";
import { resolveBusinessSlug, logBusinessSlugResolution } from "@/lib/business-utils";
import { validateAndResolvePreviewMode, logContentModeResolution } from "@/lib/preview-utils";
import { selectSectionContent } from "@/lib/content-utils";
import HomeHero from "@/components/HomeHero";
import { CanvasEditorHandler } from "@/components/canvas-editor-handler";

interface HomeProps {
  searchParams: Promise<{ token?: string; page?: string; business?: string }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  const previewToken = params.token
  const pageSlug = params.page || 'home'
  
  // Resolve business slug from query parameter or environment variable
  const businessSlug = resolveBusinessSlug(
    params.business,
    process.env.NEXT_PUBLIC_ORG_SLUG,
    'johnny-gs-brunch'
  )
  
  // Log business slug resolution for debugging
  logBusinessSlugResolution(
    params.business,
    process.env.NEXT_PUBLIC_ORG_SLUG,
    businessSlug,
    pageSlug
  )
  
  // Get the page
  const page = await getPageBySlug(businessSlug, pageSlug)
  
  // If no page found, show default static content
  if (!page) {
    return (
      <main
        className={cn(
          "min-h-screen",
          "transition-colors duration-300"
        )}
        style={{ backgroundColor: "var(--theme-bg-primary)" }}
      >
        <HomeHero />
      </main>
    )
  }

  // Validate preview token and determine draft mode
  const { useDraft, tokenValid } = await validateAndResolvePreviewMode(previewToken, page.id)

  // Get sections for this page
  const { sections, useDraft: resolvedUseDraft } = await getPageSections(
    page.id,
    useDraft,
    previewToken
  )

  // Log content mode resolution for debugging
  logContentModeResolution(
    previewToken,
    tokenValid,
    useDraft,
    resolvedUseDraft,
    sections.length
  )

  // If no sections, fallback to static content
  if (sections.length === 0) {
    return (
      <main
        className={cn(
          "min-h-screen",
          "transition-colors duration-300"
        )}
        style={{ backgroundColor: "var(--theme-bg-primary)" }}
      >
        <HomeHero />
      </main>
    )
  }

  return (
    <main
      className={cn(
        "min-h-screen",
        "transition-colors duration-300"
      )}
      style={{ backgroundColor: "var(--theme-bg-primary)" }}
    >
      {sections.map((section) => {
        const content = selectSectionContent(section, resolvedUseDraft)

        return (
          <section
            key={section.id}
            data-section-key={section.key}
            data-section-id={section.id}
          >
            <DynamicSection component={section.component} content={content} />
          </section>
        )
      })}
      <CanvasEditorHandler sections={sections.map(s => ({ id: s.id, key: s.key }))} />
    </main>
  )
}
