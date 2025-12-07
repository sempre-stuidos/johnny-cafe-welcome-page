/**
 * Zod Schema Definitions for Page Sections
 * 
 * These schemas enforce strict validation to prevent structural drift between
 * local draft_content and published_content in Supabase.
 * 
 * All schemas enforce flat structures - no nested section objects allowed.
 */

import { z } from "zod";

// ============================================================================
// Johnny G's Brunch Section Schemas
// ============================================================================

/**
 * HomeHeroSection Schema
 * Enforces flat structure with theme-dependent day/night content
 */
export const HomeHeroSectionSchema = z.object({
  address: z.string(),
  daysLabel: z.string(),
  day: z.object({
    description: z.string(),
    hours: z.string(),
    heroImage: z.string(), // Path to image
  }),
  night: z.object({
    description: z.string(),
    hours: z.string(),
    heroImage: z.string(), // Path to image
  }),
  reservationPhone: z.string(),
  reservationLabel: z.string(),
});

export type HomeHeroSectionContent = z.infer<typeof HomeHeroSectionSchema>;

/**
 * HomeAboutSection Schema
 * Enforces flat structure with title and paragraphs
 */
export const HomeAboutSectionSchema = z.object({
  title: z.string(),
  paragraphs: z.array(z.string()),
});

export type HomeAboutSectionContent = z.infer<typeof HomeAboutSectionSchema>;

/**
 * HomeMenuSection Schema
 * Enforces flat structure with title, description, and images array
 */
export const HomeMenuSectionSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  images: z.array(z.string()), // Array of image paths
});

export type HomeMenuSectionContent = z.infer<typeof HomeMenuSectionSchema>;

/**
 * HomeEventsSection Schema
 * Enforces flat structure with title and description
 */
export const HomeEventsSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type HomeEventsSectionContent = z.infer<typeof HomeEventsSectionSchema>;

/**
 * HomeReservationSection Schema
 * Minimal content for reservation section (mostly form-based)
 */
export const HomeReservationSectionSchema = z.object({
  heading: z.string().optional(),
  subheading: z.string().optional(),
});

export type HomeReservationSectionContent = z.infer<typeof HomeReservationSectionSchema>;

// ============================================================================
// Schema Registry
// ============================================================================

/**
 * Registry mapping component names to their Zod schemas
 */
export const sectionSchemas: Record<string, z.ZodSchema> = {
  HomeHeroSection: HomeHeroSectionSchema,
  HomeAboutSection: HomeAboutSectionSchema,
  HomeMenuSection: HomeMenuSectionSchema,
  HomeEventsSection: HomeEventsSectionSchema,
  HomeReservationSection: HomeReservationSectionSchema,
};

/**
 * Get the Zod schema for a component type
 */
export function getSectionSchema(component: string): z.ZodSchema | null {
  return sectionSchemas[component] || null;
}

/**
 * Validate section content against its component's schema
 * Returns the parsed content if valid, throws ZodError if invalid
 */
export function validateSectionContent(
  component: string,
  content: unknown
): { success: true; data: unknown } | { success: false; error: string; details?: unknown } {
  const schema = getSectionSchema(component);
  
  if (!schema) {
    // Unknown component type - allow it but log a warning
    console.warn(`[validateSectionContent] No schema found for component: ${component}`);
    return { success: true, data: content };
  }

  try {
    const parsed = schema.parse(content);
    return { success: true, data: parsed };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join('; ');
      return {
        success: false,
        error: `Validation failed for ${component}: ${errorMessage}`,
        details: error.issues,
      };
    }
    return {
      success: false,
      error: `Unexpected error validating ${component}: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Safe parse section content - returns parsed data or null with error message
 */
export function safeParseSectionContent(
  component: string,
  content: unknown
): { success: true; data: unknown } | { success: false; error: string } {
  const schema = getSectionSchema(component);
  
  if (!schema) {
    return { success: true, data: content };
  }

  const result = schema.safeParse(content);
  
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    const errorMessage = result.error.issues
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join('; ');
    return {
      success: false,
      error: `Validation failed for ${component}: ${errorMessage}`,
    };
  }
}
