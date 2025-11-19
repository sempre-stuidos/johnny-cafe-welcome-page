import {
  Phone,
  Facebook,
  Instagram,
  Music,
  ShoppingBag,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

export default function App() {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-y-auto">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760890633340-9c8cf3a292e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwY2x1YiUyMGF0bW9zcGhlcmV8ZW58MXx8fHwxNzYzNDY3OTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Jazz atmosphere"
          className="w-full h-full object-cover fixed"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-emerald-900/90 to-green-950/95 fixed"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 text-center">
        {/* Logo/Title */}
        <div className="mb-6">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-yellow-600 mb-2 tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Johnny G's
          </h1>
          <div className="flex items-center justify-center gap-2 text-yellow-700/80">
            <div className="h-px bg-yellow-600/50 w-12"></div>
            <span className="text-xs uppercase tracking-widest">
              Brunch & Jazz
            </span>
            <div className="h-px bg-yellow-600/50 w-12"></div>
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-6">
          <div className="inline-block bg-emerald-900/40 border border-yellow-600/30 rounded-lg px-6 py-3 backdrop-blur-sm mb-4">
            <p
              className="text-yellow-600 text-lg md:text-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Website Under Construction
            </p>
          </div>

          <p className="text-emerald-50/90 text-base md:text-lg max-w-2xl mx-auto">
            Just like a physical makeover, we're giving our
            website a fresh new look! But don't worry —{" "}
            <span className="text-yellow-500">
              we're open and fully functional
            </span>
            .
          </p>
        </div>

        {/* Hours Section */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="text-emerald-50/90 text-lg md:text-xl space-y-2">
            <p>
              <span className="text-yellow-500">Brunch:</span>{" "}
              7:00am – 4:00pm
            </p>
            <p>
              <span className="text-yellow-500">Dinner:</span>{" "}
              4:00pm – 10:00pm
            </p>
          </div>
        </div>

        {/* Jazz Nights */}
        <div className="mb-6 bg-gradient-to-r from-emerald-900/40 via-emerald-800/40 to-emerald-900/40 border-y border-yellow-600/30 py-6 px-6 backdrop-blur-sm max-w-3xl mx-auto rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Music className="w-6 h-6 text-yellow-600" />
            <h2
              className="text-2xl md:text-3xl text-yellow-600"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Live Jazz Nights
            </h2>
            <Music className="w-6 h-6 text-yellow-600" />
          </div>
          <p className="text-emerald-50/80 text-sm mb-2">
            THURSDAYS • FRIDAYS • SATURDAYS at 8pm
          </p>
          <p className="text-emerald-50/70 text-xs">
            Join us for an unforgettable evening of live jazz
            and exceptional dining
          </p>
        </div>

        {/* Call to Action */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:+16473683877"
              className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-emerald-950 px-6 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-yellow-600/50 text-base"
            >
              <Phone className="w-4 h-4" />
              <span>Reserve: (647) 368-3877</span>
            </a>
            <a
              href="https://orders.foodme.mobi/dt/johnnyg/cafebychef/main"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-emerald-950 px-6 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-yellow-600/50 text-base"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Now</span>
            </a>
          </div>
          <p className="text-emerald-100/60 text-xs mt-3">
            Call to reserve your table for dinner
          </p>
        </div>

        {/* Social Media */}
        <div>
          <p className="text-yellow-600 text-sm mb-3">
            Stay connected
          </p>
          <div className="flex items-center justify-center gap-4 mb-2">
            <a
              href="https://www.facebook.com/johnny.g.s.823880/?rdid=wCE5mSa97Ts1ZWtm"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-emerald-900/40 hover:bg-yellow-600/20 border border-yellow-700/30 hover:border-yellow-600/50 flex items-center justify-center transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-yellow-600" />
            </a>
            <a
              href="https://www.instagram.com/johnnygscafe?igsh=OXRmNTR3c3hmZTc5"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-emerald-900/40 hover:bg-yellow-600/20 border border-yellow-700/30 hover:border-yellow-600/50 flex items-center justify-center transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-yellow-600" />
            </a>
            <a
              href="https://www.tiktok.com/@johnnygscafetoronto?_t=ZM-8uL5pxkTXF7&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-emerald-900/40 hover:bg-yellow-600/20 border border-yellow-700/30 hover:border-yellow-600/50 flex items-center justify-center transition-all duration-300"
              aria-label="TikTok"
            >
              <svg
                className="w-5 h-5 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
          <p className="text-emerald-100/50 text-xs">
            Follow us for daily specials & event updates
          </p>
        </div>
      </div>
    </div>
  );
}