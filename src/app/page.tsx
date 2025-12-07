import DynamicSection from "@/components/dynamic-section";
import { CanvasEditorHandler } from "@/components/canvas-editor-handler";
import { getPageBySlug, getPageSections } from "@/lib/pages";
import { validatePreviewToken } from "@/lib/preview";
import { resolveBusinessSlug } from "@/lib/business-utils";

interface HomeProps {
  searchParams: Promise<{ token?: string; page?: string }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const previewToken = params.token;
  const pageSlug = params.page || 'home';
  
  // Get business slug from environment or use default
  const businessSlug = resolveBusinessSlug(
    undefined,
    process.env.NEXT_PUBLIC_BUSINESS_SLUG,
    'johnny-gs-brunch'
  );
  
  // Get the page
  const page = await getPageBySlug(businessSlug, pageSlug);
  
  // If no page found, show default static content (fallback)
  if (!page) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Page not found. Please configure your pages in the dashboard.</p>
      </div>
    );
  }

  // Validate preview token if provided
  let useDraft = false;
  if (previewToken) {
    const validation = await validatePreviewToken(previewToken, undefined, page.id);
    useDraft = validation.valid;
  }

  // Get sections for this page
  const { sections, useDraft: isDraftMode } = await getPageSections(page.id, useDraft, previewToken);

  // Determine which content to use (draft or published)
  const contentToUse = isDraftMode ? 'draft_content' : 'published_content';

  return (
    <>
      {sections.map((section) => (
        <DynamicSection
          key={section.id}
          component={section.component}
          content={section[contentToUse] || {}}
          sectionKey={section.key}
          sectionId={section.id}
        />
      ))}
      <CanvasEditorHandler sections={sections.map(s => ({ id: s.id, key: s.key }))} />
    </>
  );
}
