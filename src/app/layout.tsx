import type { Metadata } from "next";
import { Geist, Geist_Mono, Pinyon_Script, Gayathri } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const yellowtail = localFont({
  src: "../../public/fonts/Yellowtail-Regular.ttf",
  variable: "--font-yellowtail",
  display: "swap",
});

const fjallaOne = localFont({
  src: "../../public/fonts/FjallaOne-Regular.ttf",
  variable: "--font-fjalla-one",
  display: "swap",
});

const hornbillTrial = localFont({
  src: "../../public/fonts/Hornbill-Trial-Black.ttf",
  variable: "--font-hornbill-trial",
  display: "swap",
});

const amoretSans = localFont({
  src: "../../public/fonts/Amoret-Collection-Sans.ttf",
  variable: "--font-amoret-sans",
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon-script",
  subsets: ["latin"],
  weight: "400",
});

const gayathri = Gayathri({
  variable: "--font-gayathri",
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});

export const metadata: Metadata = {
  title:
    "Johnny G's Restaurant | Breakfast, Lunch & Dinner in Cabbagetown, Toronto",
  description:
    "Johnny G's established in 1975 - A prominent breakfast and brunch place in Cabbagetown for over 4.5 decades. Now serving delicious Indian, Hakka, and Momo dishes for dinner. Visit us at 478 Parliament St, Toronto.",
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
  ],
  authors: [{ name: "Johnny G's Restaurant" }],
  creator: "Johnny G's Restaurant",
  publisher: "Johnny G's Restaurant",
  metadataBase: new URL("https://johnnygsrestaurant.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Johnny G's Restaurant | Breakfast, Lunch & Dinner in Cabbagetown",
    description:
      "Established in 1975. Serving fresh, locally sourced breakfast, lunch, and dinner in Cabbagetown, Toronto. The Old Meets The New.",
    url: "https://johnnygsrestaurant.ca",
    siteName: "Johnny G's Restaurant",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Johnny G's Restaurant | Breakfast, Lunch & Dinner in Cabbagetown",
    description:
      "Established in 1975. Serving fresh, locally sourced breakfast, lunch, and dinner in Cabbagetown, Toronto.",
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
    "restaurant:hours": "Breakfast: 7:00am - 4:00pm | Dinner: 4:00pm - 10:00pm",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${yellowtail.variable} ${fjallaOne.variable} ${hornbillTrial.variable} ${amoretSans.variable} ${pinyonScript.variable} ${gayathri.variable} antialiased`}
      >
        <ThemeProvider>
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
