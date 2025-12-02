export default function System() {
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
          <h2 className="mb-8 text-center">Typography System Demo</h2>
          
          {/* Two Column Layout: Light Mode (Left) and Dark Mode (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT COLUMN: Light Mode */}
            <div className="space-y-0">
              {/* Section 1: Dark Green Background (#334D2D) */}
              <section 
                className="p-8 transition-colors duration-300"
                style={{ backgroundColor: 'var(--theme-bg-nav)' }}
              >
                <div className="flex flex-col gap-6">
                  {/* Element 1: Header 1 - Hornbill Trial Black Italic */}
                  <h1
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
                  <p
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
                  </p>

                  {/* Element 3: Paragraph - Hornbill Trial Regular */}
                  <p
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
                  </p>

                  {/* Element 4: Small Text - Amoret Sans */}
                  <p
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
                  </p>
                </div>
              </section>

              {/* Section 2: Light Cream Background (#FAF2DD) */}
              <section 
                className="p-8 transition-colors duration-300"
                style={{ backgroundColor: 'var(--theme-bg-light-cream)' }}
              >
                <div className="flex flex-col gap-6">
                  {/* Element 5: Heading - Hornbill Trial Bold */}
                  <h2
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
                  </h2>

                  {/* Element 6: Small Text - Amoret Sans */}
                  <p
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

                  {/* Reservation - Amoret Sans */}
                  <p
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
                  </p>

                  {/* Element 8: Paragraph - Gayathri */}
                  <p
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

            {/* RIGHT COLUMN: Dark Mode */}
            <div className="space-y-0">
              {/* Section 1: Dark Green Background (#334D2D) - Dark Mode Version */}
              <section 
                className="p-8 transition-colors duration-300"
                style={{ backgroundColor: 'var(--theme-bg-nav)' }}
              >
                <div className="flex flex-col gap-6">
                  {/* Element 1: Header 1 - Hornbill Trial Black Italic - Dark Mode */}
                  <h1
                    style={{
                      fontFamily: 'var(--font-hornbill-trial)',
                      fontWeight: 900,
                      fontStyle: 'italic',
                      fontSize: '83px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: '#B29738',
                      width: '489px',
                      height: '56px',
                    }}
                  >
                    JOHNNY G
                  </h1>

                  {/* Element 2: Header 2 - Pinyon Script - Dark Mode */}
                  <h2
                    style={{
                      fontFamily: 'var(--font-pinyon-script)',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '82.48px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: '#B29738',
                      width: '236px',
                      height: '56px',
                    }}
                  >
                    Brunch
                  </h2>

                  {/* Element 7: Uppercase Text - Gayathri - Dark Mode */}
                  <p
                    style={{
                      fontFamily: 'var(--font-gayathri)',
                      fontWeight: 700,
                      fontStyle: 'normal',
                      fontSize: '17.31px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      textTransform: 'uppercase',
                      color: '#B29738',
                      width: '491px',
                      height: '21px',
                    }}
                  >
                    478 PARLIAMENT ST
                  </p>

                  {/* Element 3: Paragraph - Hornbill Trial Regular */}
                  <p
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
                  </p>

                  {/* Element 4: Small Text - Amoret Sans - Dark Mode */}
                  <p
                    style={{
                      fontFamily: 'var(--font-amoret-sans)',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '18.9px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: '#FAF2DD',
                      width: '107px',
                      height: '25px',
                    }}
                  >
                    MONDAY - SUNDAY
                  </p>
                </div>
              </section>

              {/* Section 2: Dark Green Background (#334D2D) - Dark Mode Version */}
              <section 
                className="p-8 transition-colors duration-300"
                style={{ backgroundColor: '#334D2D' }}
              >
                <div className="flex flex-col gap-6">
                  {/* Element 5: Heading - Hornbill Trial Bold - Dark Mode */}
                  <h2
                    style={{
                      fontFamily: 'var(--font-hornbill-trial)',
                      fontWeight: 700,
                      fontStyle: 'normal',
                      fontSize: '48px',
                      lineHeight: '110%',
                      letterSpacing: '0%',
                      color: '#FAF2DD',
                      width: '599px',
                      height: '106px',
                    }}
                  >
                    Meet 30 Years of Culinary Mastery
                  </h2>

                  {/* Element 6: Small Text - Amoret Sans */}
                  <p
                    style={{
                      fontFamily: 'var(--font-amoret-sans)',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '16px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: 'var(--theme-text-light-cream)',
                      width: '149px',
                      height: '13px',
                    }}
                  >
                    Welcome to Johnny G&apos;s!
                  </p>

                  {/* Reservation - Amoret Sans - Dark Mode */}
                  <p
                    style={{
                      fontFamily: 'var(--font-amoret-sans)',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '16px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: '#FAF2DD',
                      width: '149px',
                      height: '13px',
                    }}
                  >
                    Reservation
                  </p>

                  {/* Element 8: Paragraph - Gayathri - Dark Mode */}
                  <p
                    style={{
                      fontFamily: 'var(--font-gayathri)',
                      fontWeight: 700,
                      fontStyle: 'normal',
                      fontSize: '16px',
                      lineHeight: '150%',
                      letterSpacing: '0.02em',
                      color: '#FFFFFF',
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
