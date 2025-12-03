export default function Home() {
  return (
    <main className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
      <section 
        className="w-full h-[90vh] p-8   transition-colors duration-300 overflow-y-hidden"
        style={{ backgroundColor: 'var(--theme-bg-nav)' }}
      >
        <div className="flex flex-col justify-between h-full ">
          <div>
            <h3>
              478 PARLIAMENT ST
            </h3>

            <h1>
              JOHNNY G's
            </h1>
            <div className="flex flex-row align-bottom" style={{ width: '500', position: 'relative' }}>
              <h2 style={{ 
                position: 'absolute',
                WebkitTextStroke: '2px #334D2D',
              }}>
                Brunch
              </h2>
              <p style={{
                fontFamily: 'var(--font-amoret-sans)',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '18.9px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: 'var(--theme-text-light-cream)',
                height: '25px',
                position: 'absolute',
                left: 300,
                top: 45
              }}>
                EST 1975
              </p>
            </div>

          </div>

          <div className="flex flex-col justify-between" style={{ height: '260px' }}>
            <h4>
              Have brunch at one of the oldest Restaurants in Cabbagetown
            </h4>

            <div className="flex flex-col justify-between" style={{ height: '60px' }}>
              <h5>
                MONDAY - SUNDAY
              </h5>

              <h5>
                7AM - 4PM
              </h5>
            </div>


          </div>
          <button className="btn-reservation">
            Reservation
          </button>
        </div>
      </section>
    </main>
  );
}
