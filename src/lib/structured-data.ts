/**
 * Structured Data (JSON-LD) helpers for SEO
 * Generates schema.org markup for search engines
 */

interface Address {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

interface OpeningHours {
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

/**
 * Generate Restaurant schema with music venue properties
 */
export function generateRestaurantSchema(options: {
  name: string;
  description: string;
  address: Address;
  geo: GeoCoordinates;
  telephone: string;
  email: string;
  url: string;
  priceRange: string;
  servesCuisine: string[];
  openingHours: OpeningHours[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: options.name,
    description: options.description,
    image: `${options.url}/assets/imgs/events-scene.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: options.address.streetAddress,
      addressLocality: options.address.addressLocality,
      addressRegion: options.address.addressRegion,
      postalCode: options.address.postalCode,
      addressCountry: options.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: options.geo.latitude,
      longitude: options.geo.longitude,
    },
    url: options.url,
    telephone: options.telephone,
    email: options.email,
    priceRange: options.priceRange,
    servesCuisine: options.servesCuisine,
    openingHoursSpecification: options.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    // Music venue properties for jazz nights
    musicBy: {
      "@type": "MusicGroup",
      name: "Local Toronto Jazz Artists",
      genre: "Jazz",
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Live Jazz Music",
        value: "Thursday through Saturday evenings",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Intimate Venue",
        value: "Cozy East End Toronto setting",
      },
    ],
  };
}

/**
 * Generate MusicVenue schema for jazz nights
 */
export function generateMusicVenueSchema(options: {
  name: string;
  description: string;
  address: Address;
  geo: GeoCoordinates;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicVenue",
    name: `${options.name} - Live Jazz`,
    description: options.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: options.address.streetAddress,
      addressLocality: options.address.addressLocality,
      addressRegion: options.address.addressRegion,
      postalCode: options.address.postalCode,
      addressCountry: options.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: options.geo.latitude,
      longitude: options.geo.longitude,
    },
    url: `${options.url}/events`,
    hasMap: "https://www.google.com/maps/search/?api=1&query=478+Parliament+St,+Toronto,+ON+M5A+2L3",
  };
}

/**
 * Generate Event schema for recurring jazz nights
 */
export function generateJazzEventSchema(options: {
  name: string;
  description: string;
  location: {
    name: string;
    address: Address;
  };
  url: string;
  startTime: string;
  endTime: string;
  days: string[];
  imageUrl?: string;
  performerName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: options.name,
    description: options.description,
    image: options.imageUrl,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "MusicVenue",
      name: options.location.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: options.location.address.streetAddress,
        addressLocality: options.location.address.addressLocality,
        addressRegion: options.location.address.addressRegion,
        postalCode: options.location.address.postalCode,
        addressCountry: options.location.address.addressCountry,
      },
    },
    performer: options.performerName
      ? {
          "@type": "MusicGroup",
          name: options.performerName,
        }
      : undefined,
    organizer: {
      "@type": "Organization",
      name: options.location.name,
      url: options.url,
    },
    eventSchedule: {
      "@type": "Schedule",
      byDay: options.days,
      startTime: options.startTime,
      endTime: options.endTime,
      scheduleTimezone: "America/Toronto",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "CAD",
      url: `${options.url}/events`,
      validFrom: new Date().toISOString(),
    },
  };
}

/**
 * Generate BreadcrumbList schema for better navigation in search results
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

