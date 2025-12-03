"use client";

import { useState } from "react";

export default function System() {
  const [copiedElement, setCopiedElement] = useState<string | null>(null);

  const copyElementName = async (elementName: string) => {
    try {
      await navigator.clipboard.writeText(elementName);
      setCopiedElement(elementName);
      setTimeout(() => setCopiedElement(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <main className="min-h-screen p-8 transition-colors duration-300" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-0">
          {/* Copy confirmation toast */}
          {copiedElement && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
              Copied &quot;{copiedElement}&quot; to clipboard!
            </div>
          )}
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-0">
              {/* Section 1: Dark Green Background (#334D2D) */}
              <section 
                className="p-8 transition-colors duration-300"
                style={{ backgroundColor: 'var(--theme-bg-nav)' }}
              >
                <div className="flex flex-col gap-6">
                  {/* Element 1: Header 1 - Hornbill Trial Black Italic */}
                  <h1 onDoubleClick={() => copyElementName("h1")}>
                    JOHNNY G
                  </h1>

                  {/* Element 2: Header 2 - Pinyon Script */}
                  <h2 onDoubleClick={() => copyElementName("h2")}>
                    Brunch
                  </h2>

                  {/* Element 7: Uppercase Text - Gayathri */}
                  <h3 onDoubleClick={() => copyElementName("h3")}>
                    478 PARLIAMENT ST
                  </h3>

                  {/* Element 3: Paragraph - Hornbill Trial Regular */}
                  <h4 onDoubleClick={() => copyElementName("h4")}>
                    Have brunch at one of the oldest Restaurants in Cabbagetown
                  </h4>

                  {/* Element 4: Small Text - Amoret Sans */}
                  <h5 onDoubleClick={() => copyElementName("h5")}>
                    MONDAY - SUNDAY
                  </h5>
                </div>
              </section>

              {/* Section 2: Light Cream Background (#FAF2DD) */}
              <section 
                className="p-8 transition-colors duration-300"
                data-section-two="true"
                style={{ backgroundColor: 'var(--theme-bg-light-cream)' }}
              >
                <div className="flex flex-col gap-6">
                  {/* Element 5: Heading - Hornbill Trial Bold */}
                  <h3 onDoubleClick={() => copyElementName("h3")}>
                    Meet 30 Years of Culinary Mastery
                  </h3>

                  {/* Element 6: Small Text - Amoret Sans */}
                  <span>
                    <p onDoubleClick={() => copyElementName("p")}>
                      Welcome to Johnny G&apos;s!
                    </p>
                  </span>

                  {/* Reservation - Amoret Sans */}
                  <span onDoubleClick={() => copyElementName("span")}>
                    Reservation
                  </span>

                  {/* Element 8: Paragraph - Gayathri */}
                  <p onDoubleClick={() => copyElementName("p")}>
                    Welcome to Johnny G&apos;s! This iconic Cabbagetown spot, established in 1975, has been serving the community for over four decades. Experience our delicious brunch offerings, featuring classic breakfast favorites and innovative dishes that celebrate the rich culinary heritage of the neighborhood.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
