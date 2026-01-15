import type { Metadata } from "next";
import { Geist, Geist_Mono, Gayathri } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LenisProvider } from "@/contexts/LenisContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { generateRestaurantSchema } from "@/lib/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const yellowtail = localFont({
  src: "./../../public/fonts/Yellowtail-Regular.ttf",
  variable: "--font-yellowtail",
  display: "swap",
});

const fjallaOne = localFont({
  src: "./../../public/fonts/FjallaOne-Regular.ttf",
  variable: "--font-fjalla-one",
  display: "swap",
});

const hornbillTrial = localFont({
  src: "./../../public/fonts/Hornbill-Trial-Black.ttf",
  variable: "--font-hornbill-trial",
  display: "swap",
});

const amoretSans = localFont({
  src: "./../../public/fonts/Amoret-Collection-Sans.ttf",
  variable: "--font-amoret-sans",
  display: "swap",
});

const pinyonScript = localFont({
  src: "./../../public/fonts/PinyonScript-Regular.ttf",
  variable: "--font-pinyon-script",
  display: "swap",
});

const gayathri = Gayathri({
  variable: "--font-gayathri",
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});

const goodTimes = localFont({
  src: "./../../public/fonts/GoodTimesRg.otf",
  variable: "--font-good-times",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Johnny G's Restaurant | Breakfast, Lunch, Dinner & Live Jazz in Cabbagetown, Toronto",
  description:
    "Johnny G's established in 1975 - A prominent breakfast and brunch place in Cabbagetown for over 4.5 decades. Now serving delicious Indian, Hakka, and Momo dishes for dinner with live jazz nights every Thursday-Saturday. Toronto's East End jazz venue at 478 Parliament St.",
  icons: {
    icon: [
      { url: '/cafe-logo.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/cafe-logo.png?v=2', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/cafe-logo.png?v=2', sizes: '180x180', type: 'image/png' },
    shortcut: '/cafe-logo.png?v=2',
  },
  keywords: [
    "Johnny G's",
    "restaurant Toronto",
    "breakfast Cabbagetown",
    "brunch Toronto",
    "Indian food Toronto",
    "Hakka cuisine",
    "Momo Toronto",
    "Cabbagetown restaurant",
    "Parliament Street restaurant",
    "breakfast restaurant",
    "dinner restaurant Toronto",
    "toronto jazz night",
    "east end jazz night",
    "live jazz toronto",
    "jazz restaurant toronto",
    "cabbagetown jazz",
  ],
  authors: [{ name: "Johnny G's Restaurant" }],
  creator: "Johnny G's Restaurant",
  publisher: "Johnny G's Restaurant",
  metadataBase: new URL("https://johnnygsrestaurant.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Johnny G's Restaurant | Breakfast, Lunch, Dinner & Live Jazz in Cabbagetown",
    description:
      "Established in 1975. Serving fresh, locally sourced breakfast, lunch, and dinner in Cabbagetown, Toronto. Live jazz nights every Thursday-Saturday in Toronto's East End.",
    url: "https://johnnygsrestaurant.ca",
    siteName: "Johnny G's Restaurant",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Johnny G's Restaurant | Breakfast, Lunch, Dinner & Live Jazz in Cabbagetown",
    description:
      "Established in 1975. Serving fresh, locally sourced breakfast, lunch, and dinner in Cabbagetown, Toronto. Live jazz nights Thursday-Saturday.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "contact:phone_number": "+1 647-368-3877",
    "contact:email": "johnnygs478@gmail.com",
    "contact:street_address": "478 Parliament St",
    "contact:locality": "Toronto",
    "contact:region": "ON",
    "contact:postal_code": "M5A 2L3",
    "contact:country_name": "Canada",
    "restaurant:hours": "Brunch: 7:00 AM – 4:00 PM | Dinner: Tuesday–Sunday 4:30 PM – 9:00 PM | Live Jazz: Thursday–Saturday 9:00 PM – 12:00 AM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate Restaurant structured data with jazz venue properties
  const restaurantSchema = generateRestaurantSchema({
    name: "Johnny G's",
    description: "Established in 1975, Johnny G's is a beloved Cabbagetown restaurant serving breakfast, brunch, and dinner with live jazz nights every Thursday-Saturday. Toronto's premier East End jazz venue.",
    address: {
      streetAddress: "478 Parliament St",
      addressLocality: "Toronto",
      addressRegion: "ON",
      postalCode: "M5A 2L3",
      addressCountry: "CA",
    },
    geo: {
      latitude: 43.6621,
      longitude: -79.3652,
    },
    telephone: "+1-647-368-3877",
    email: "johnnygs478@gmail.com",
    url: "https://johnnygsrestaurant.ca",
    priceRange: "$$",
    servesCuisine: ["Breakfast", "Brunch", "Indian", "Hakka", "Momo", "Canadian"],
    openingHours: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:00",
        closes: "16:00",
      },
      {
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "16:30",
        closes: "21:00",
      },
      {
        dayOfWeek: ["Thursday", "Friday", "Saturday"],
        opens: "21:00",
        closes: "00:00",
      },
    ],
  });

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${yellowtail.variable} ${fjallaOne.variable} ${hornbillTrial.variable} ${amoretSans.variable} ${pinyonScript.variable} ${gayathri.variable} ${goodTimes.variable} antialiased`}
      >
        <LenisProvider>
          <ThemeProvider>
            <Nav />
            {children}
            <Footer />
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
