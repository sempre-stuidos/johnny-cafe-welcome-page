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
        <div className="text-center space-y-4">
          <h1 className="text-decorative text-6xl sm:text-8xl" style={{ color: 'var(--theme-accent)' }}>
            Johnny G&apos;s
          </h1>
          <p className="text-2xl" style={{ color: 'var(--theme-text-body)' }}>
            Est. 1975
          </p>
        </div>

        <div className="space-y-0">
          <h2 className="mb-8 text-center">Typography System</h2>
          
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
                  <h1
                    className="typography-element"
                    data-element="h1"
                    onDoubleClick={() => copyElementName("h1")}
                    style={{
                      fontFamily: 'var(--font-hornbill-trial)',
                      fontWeight: 900,
                      fontStyle: 'italic',
                      fontSize: '83px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: 'var(--theme-text-light-cream)',
                      width: '489px',
                      height: '56px',
                    }}
                  >
                    JOHNNY G
                  </h1>

                  {/* Element 2: Header 2 - Pinyon Script */}
                  <h2
                    className="typography-element"
                    data-element="h2"
                    onDoubleClick={() => copyElementName("h2")}
                    style={{
                      fontFamily: 'var(--font-pinyon-script)',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '82.48px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: 'var(--theme-text-light-cream)',
                      width: '236px',
                      height: '56px',
                    }}
                  >
                    Brunch
                  </h2>

                  {/* Element 7: Uppercase Text - Gayathri */}
                  <h3
                    className="typography-element"
                    data-element="h3"
                    onDoubleClick={() => copyElementName("h3")}
                    style={{
                      fontFamily: 'var(--font-gayathri)',
                      fontWeight: 700,
                      fontStyle: 'normal',
                      fontSize: '17.31px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      textTransform: 'uppercase',
                      color: 'var(--theme-text-light-cream)',
                      width: '154px',
                      height: '21px',
                    }}
                  >
                    478 PARLIAMENT ST
                  </h3>

                  {/* Element 3: Paragraph - Hornbill Trial Regular */}
                  <h4
                    className="typography-element"
                    data-element="h4"
                    onDoubleClick={() => copyElementName("h4")}
                    style={{
                      fontFamily: 'var(--font-hornbill-trial)',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '42px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: 'var(--theme-text-light-cream)',
                      width: '380px',
                      height: '154px',
                    }}
                  >
                    Have brunch at one of the oldest Restaurants in Cabbagetown
                  </h4>

                  {/* Element 4: Small Text - Amoret Sans */}
                  <h5
                    className="typography-element"
                    data-element="h5"
                    data-monday-sunday="true"
                    onDoubleClick={() => copyElementName("h5")}
                    style={{
                      fontFamily: 'var(--font-amoret-sans)',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '18.9px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: 'var(--theme-text-light-cream)',
                      width: '107px',
                      height: '25px',
                    }}
                  >
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
                  <h3
                    className="typography-element"
                    data-element="h3"
                    data-heading="true"
                    onDoubleClick={() => copyElementName("h3")}
                    style={{
                      fontFamily: 'var(--font-hornbill-trial)',
                      fontWeight: 700,
                      fontStyle: 'normal',
                      fontSize: '48px',
                      lineHeight: '110%',
                      letterSpacing: '0%',
                      color: 'var(--theme-text-dark-green)',
                      width: '599px',
                      height: '106px',
                    }}
                  >
                    Meet 30 Years of Culinary Mastery
                  </h3>

                  {/* Element 6: Small Text - Amoret Sans */}
                  <span>
                    <p
                      className="typography-element"
                      data-element="p"
                      data-welcome="true"
                      onDoubleClick={() => copyElementName("p")}
                      style={{
                        fontFamily: 'var(--font-gayathri)',
                        fontWeight: 700,
                        fontStyle: 'normal',
                        fontSize: '16px',
                        lineHeight: '150%',
                        letterSpacing: '2%',
                        color: '#000000',
                        width: '149px',
                        height: '13px',
                      }}
                    >
                      Welcome to Johnny G&apos;s!
                    </p>
                  </span>

                  {/* Reservation - Amoret Sans */}
                  <span
                    className="typography-element"
                    data-element="span"
                    data-reservation="true"
                    onDoubleClick={() => copyElementName("span")}
                    style={{
                      fontFamily: 'var(--font-amoret-sans)',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '16px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: '#334D2D',
                      width: '149px',
                      height: '13px',
                    }}
                  >
                    Reservation
                  </span>

                  {/* Element 8: Paragraph - Gayathri */}
                  <p
                    className="typography-element"
                    data-element="p"
                    data-paragraph="true"
                    onDoubleClick={() => copyElementName("p")}
                    style={{
                      fontFamily: 'var(--font-gayathri)',
                      fontWeight: 700,
                      fontStyle: 'normal',
                      fontSize: '16px',
                      lineHeight: '150%',
                      letterSpacing: '0.02em',
                      color: 'var(--theme-text-dark-green)',
                      width: '542px',
                      height: '312px',
                    }}
                  >
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
